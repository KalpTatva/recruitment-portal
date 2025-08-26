import {
  Component,
  inject,
  OnChanges,
  OnInit,
  Signal,
  signal,
  SimpleChanges,
  WritableSignal,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';
import { AuthServices } from '../../../../auth/services/auth.services';
import { RedButtonComponent } from '../../../../../shared/ui/buttons/red-button/red.button';
import { BlueButtonComponent } from '../../../../../shared/ui/buttons/blue-button/blue.button';
import { CommonModule } from '@angular/common';
import { SharedServices } from '../../../../../shared/services/shared.services';
import { SnackBarSuccessComponent } from '../../../../../shared/components/snackbarSuccess/snackbar.success';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminServices } from '../../services/admin.services';
import { EditAdminProfile } from '../../models/admin.interface';

@Component({
  standalone: true,
  imports: [
    TranslocoModule,
    ReactiveFormsModule,
    RedButtonComponent,
    BlueButtonComponent,
    CommonModule,
  ],
  styleUrls: ['./edit-profile.component.scss'],
  selector: 'edit-company-profile',
  templateUrl: './edit-profile.component.html'
})
export class EditProfileComponent implements OnInit, OnChanges{
  private fb = inject(FormBuilder);
  private sharedService = inject(SharedServices);
  private snackBar = inject(MatSnackBar);
  private adminService = inject(AdminServices);

  errorBackEnd = signal('');
  removeBtn: WritableSignal<string> = signal('Remove');
  addBtn: WritableSignal<string> = signal('+ Add Location');
  countries = signal<any[]>([]);
  stateLists = signal<any[]>([]);
  cityLists = signal<any[]>([]);

  EditCompanyForm = this.fb.group({
    userId: ['', Validators.required],
    companyId: ['', Validators.required],
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ],
    ],
    userName: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    countryCode: ['', Validators.required],
    companyName: [
      '',
      [Validators.required, Validators.pattern(/^[a-zA-Z0-9@%.,"'\s]+$/)],
    ],
    companyType: ['', Validators.required],
    companyDescription: ['', Validators.required],
    companyWebsite: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(https?:\/\/)?([\w.-]+)+\.[a-z]{2,}\/?$/),
      ],
    ],
    companyLocation: ['', Validators.required],
    companyFoundedYear: [
      '',
      [Validators.required, Validators.pattern(/^(19|20)\d{2}$/)],
    ],
    industryType: ['', Validators.required],
    numberOfFounders: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    totalEmployees: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    totalMaleEmployees: [
      '',
      [Validators.required, Validators.pattern(/^\d+$/)],
    ],
    totalFemaleEmployees: [
      '',
      [Validators.required, Validators.pattern(/^\d+$/)],
    ],
    totalOthersEmployees: [
      '',
      [Validators.required, Validators.pattern(/^\d+$/)],
    ],
    totalRevenue: [
      '',
      [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
    ],
    linkedIn: '',
    twitter: '',
    facebook: '',
    medium: '',
    companyLocations: this.fb.array([]),
  });

  // factory for one location
  createLocation(loc?: any): FormGroup {
    return this.fb.group({
      companyLocationId: [0],
      countryId: [loc?.countryId || '', Validators.required],
      stateId: [loc?.stateId || '', Validators.required],
      cityId: [loc?.cityId || '', Validators.required],
      address: [loc?.address || '', Validators.required],
    });
  }

  // helper to get location
  get companyLocations(): FormArray {
    return this.EditCompanyForm.get('companyLocations') as FormArray;
  }

  // add new location
  addLocation() {
    this.companyLocations.push(this.createLocation());
  }

  // remove location
  removeLocation(index: number) {
    this.companyLocations.removeAt(index);
  }

  required(value: string) {
    return (
      this.EditCompanyForm.get(`${value}`)?.hasError('required') &&
      (this.EditCompanyForm.get(`${value}`)?.touched ||
        this.EditCompanyForm.get(`${value}`)?.dirty)
    );
  }

  requiredArray(index: number, controlName: string): boolean {
    const control = this.companyLocations.at(index).get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  matchExp(value: string) {
    return this.EditCompanyForm.get(`${value}`)?.hasError('pattern');
  }

  matching() {
    if (
      this.EditCompanyForm.errors?.['passwordMismatch'] &&
      this.EditCompanyForm.get('confirmPassword')?.touched
    ) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit() {
    this.getCountryList();
    this.getCompanyDetails();
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  getCompanyDetails() {
    this.adminService.getCompanyDetailsByEmail().subscribe({
      next: (res) => {
        // this.EditCompanyForm.reset();
        const companyData = res.data;

        // Patch simple fields
        this.EditCompanyForm.patchValue({
          email: companyData.email,
          userName: companyData.userName,
          phone: companyData.phone,
          countryCode: companyData.countryCode || '',
          companyName: companyData.companyName,
          companyType: companyData.companyType,
          companyLocation: companyData.companyLocation,
          companyDescription: companyData.companyDescription,
          companyWebsite: companyData.companyWebsite,
          companyFoundedYear:
            companyData.companyFoundedYear == 0 ? '' : companyData.companyFoundedYear,
          industryType: companyData.industryType,
          numberOfFounders:
            companyData.numberOfFounders == 0 ? '' : companyData.numberOfFounders,
          totalEmployees:
            companyData.totalEmployees == 0 ? '' : companyData.totalEmployees,
          totalMaleEmployees:
            companyData.totalMaleEmployees == 0 ? '' : companyData.totalMaleEmployees,
          totalFemaleEmployees:
            companyData.totalFemaleEmployees == 0 ? '' : companyData.totalFemaleEmployees,
          totalOthersEmployees:
            companyData.totalOthersEmployees == 0 ? '' : companyData.totalOthersEmployees,
          totalRevenue:
            companyData.totalRevenue == 0 ? '' : companyData.totalRevenue,
          linkedIn: companyData.linkedIn,
          twitter: companyData.twitter,
          facebook: companyData.facebook,
          medium: companyData.medium,
          companyId: companyData.companyId,
          userId: companyData.userId,
        });
        // Clear and update company locations
        const locations = this.EditCompanyForm.get('companyLocations') as FormArray;
        locations.clear();

        if (companyData.companyLocations?.length > 0) {
          companyData.companyLocations.forEach((loc: any, index: number) => {
            const locationFormGroup = this.createLocation(loc);
            locationFormGroup.patchValue({ companyLocationId: loc.companyLocationId });
            locations.push(locationFormGroup);

            // If countryId is present, fetch states
            if (loc.countryId) {
              this.getStateList(loc.countryId, index);
            }

            // If stateId is present, fetch cities
            if (loc.stateId) {
              this.getCityList(loc.stateId, index);
            }
          });
        } else {
          locations.push(this.createLocation());
        }
      },
      error: (err) => {
        this.openSnackBarError(err.error.message);
        this.errorBackEnd.set('Failed to load company details. Please try again later.');
      },
    });
  }


  getCountryList() {
    this.sharedService.getCountryList().subscribe({
      next: (res) => {
        // console.log(res.data);
        this.countries.set(res.data);
      },
      error: (err) => {
        this.openSnackBarError(err.error.message);
        this.errorBackEnd.set(
          'Failed to load country list. Please try again later.'
        );
      },
    });
  }

  getStateList(countryId: number, rowIndex: number) {
    this.sharedService.getStateList(Number(countryId)).subscribe({
      next: (res) => {
        const current = [...this.stateLists()];
        current[rowIndex] = res.data;
        this.stateLists.set(current);
      },
      error: (err) => {
        this.openSnackBarError(err.error.message);
      },
    });
  }

  getCityList(stateId: number, rowIndex: number) {
    this.sharedService.getCityList(Number(stateId)).subscribe({
      next: (res) => {
        const current = [...this.cityLists()];
        current[rowIndex] = res.data;
        this.cityLists.set(current);
      },
      error: (err) => {
        this.openSnackBarError(err.error.message);
      },
    });
  }

  onSubmit() {
    this.adminService
      .editCompanyDetails({
        companyName: this.EditCompanyForm.value.companyName!,
        companyType: this.EditCompanyForm.value.companyType!,
        companyDescription: this.EditCompanyForm.value.companyDescription!,
        companyWebsite: this.EditCompanyForm.value.companyWebsite!,
        companyLocation: this.EditCompanyForm.value.companyLocation!,
        companyFoundedYear: Number(
          this.EditCompanyForm.value.companyFoundedYear
        ),
        industryType: this.EditCompanyForm.value.industryType!,
        numberOfFounders: Number(this.EditCompanyForm.value.numberOfFounders),
        totalEmployees: Number(this.EditCompanyForm.value.totalEmployees),
        totalMaleEmployees: Number(
          this.EditCompanyForm.value.totalMaleEmployees
        ),
        totalFemaleEmployees: Number(
          this.EditCompanyForm.value.totalFemaleEmployees
        ),
        totalOthersEmployees: Number(
          this.EditCompanyForm.value.totalOthersEmployees
        ),
        totalRevenue: Number(this.EditCompanyForm.value.totalRevenue),
        linkedIn: this.EditCompanyForm.value.linkedIn!,
        twitter: this.EditCompanyForm.value.twitter!,
        facebook: this.EditCompanyForm.value.facebook!,
        medium: this.EditCompanyForm.value.medium!,
        userId: Number(this.EditCompanyForm.value.userId),
        companyId: Number(this.EditCompanyForm.value.companyId),
        email: this.EditCompanyForm.value.email! || '',
        userName: this.EditCompanyForm.value.userName! || '',
        phone: Number(this.EditCompanyForm.value.phone),
        countryCode: this.EditCompanyForm.value.countryCode || '',
        companyLocations: (this.EditCompanyForm.value.companyLocations ??
          []) as { countryId: number; stateId: number; companyLocationId: number; cityId: number; address: string }[],
      })
      .subscribe({
        next: (res) => {
          this.getCompanyDetails();
          this.openSnackBarSuccess(res.message);
        },
        error: (res) => {
          this.openSnackBarError(res.error.message);
          this.errorBackEnd.set(
            'Failed to update company details. Please try again later.'
          );
        },
      });
  }

  // snackbars
  openSnackBarSuccess(message: string) {
    this.snackBar.openFromComponent(SnackBarSuccessComponent, {
      data: message,
      panelClass: 'snackbar-success',
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  openSnackBarError(message: string) {
    this.snackBar.openFromComponent(SnackBarSuccessComponent, {
      data: message,
      panelClass: 'snackbar-error',
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
}

































