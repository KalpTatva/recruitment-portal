import {
  Component,
  inject,
  OnInit,
  Signal,
  signal,
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
  template: `
    <form
      [formGroup]="EditCompanyForm"
      (ngSubmit)="onSubmit()"
      class="login-form"
    >
      <h4>General Details</h4>
      <div class="form-group-flex">
        <!-- Email -->
        <div class="form-group">
          <label for="email" class="form-label">
            {{ 'EMAIL_LABEL' | transloco }}
          </label>
          <input
            type="email"
            formControlName="email"
            id="email"
            [placeholder]="'EMAIL_PLACEHOLDER' | transloco"
            class="form-input"
          />
          @if(required("email")) {
          <div class="error">{{ 'EMAIL_REQUIRED' | transloco }}</div>
          } @else if(matchExp("email")) {
          <div class="error">{{ 'EMAIL_INVALID' | transloco }}</div>
          }
        </div>

        <!-- username -->
        <div class="form-group">
          <label for="userName" class="form-label">
            {{ 'USERNAME_LABEL' | transloco }}
          </label>
          <input
            type="text"
            formControlName="userName"
            id="userName"
            [placeholder]="'USERNAME_PLACEHOLDER' | transloco"
            class="form-input"
          />
          @if(required("userName")) {
          <div class="error">{{ 'USERNAME_REQUIRED' | transloco }}</div>
          }
        </div>

        <!-- phone  -->
        <div class="form-group">
          <label for="phone" class="form-label">
            {{ 'PHONE_LABEL' | transloco }}
          </label>
          <input
            type="text"
            formControlName="phone"
            id="phone"
            [placeholder]="'PHONE_PLACEHOLDER' | transloco"
            class="form-input"
          />
          @if(required("phone")) {
          <div class="error">{{ 'PHONE_REQUIRED' | transloco }}</div>
          } @else if(matchExp("phone")) {
          <div class="error">{{ 'PHONE_INVALID' | transloco }}</div>
          }
        </div>
      </div>

      <div class="form-group-flex">
        <!-- Company name  -->
        <div class="form-group">
          <label for="companyName" class="form-label">
            {{ 'COMPANY_NAME_LABEL' | transloco }}
          </label>
          <input
            type="text"
            formControlName="companyName"
            id="companyName"
            [placeholder]="'COMPANY_NAME_PLACEHOLDER' | transloco"
            class="form-input"
          />
          @if(required("companyName")) {
          <div class="error">
            {{ 'COMPANY_NAME_REQUIRED' | transloco }}
          </div>
          } @else if(matchExp("companyName")) {
          <div class="error">
            {{ 'COMPANY_NAME_INVALID' | transloco }}
          </div>
          }
        </div>

        <!-- Company type  -->
        <div class="form-group">
          <label for="CompanyType" class="form-label">
            {{ 'COMPANY_TYPE_LABEL' | transloco }}
          </label>
          <input
            type="text"
            formControlName="CompanyType"
            id="CompanyType"
            [placeholder]="'COMPANY_TYPE_PLACEHOLDER' | transloco"
            class="form-input"
          />
          @if(required("CompanyType")) {
          <div class="error">
            {{ 'COMPANY_TYPE_REQUIRED' | transloco }}
          </div>
          }
        </div>
      </div>

      <!-- Company description  -->
      <div class="form-group">
        <label for="companyDescription" class="form-label">
          {{ 'COMPANY_DESCRIPTION_LABEL' | transloco }}
        </label>
        <textarea
          formControlName="companyDescription"
          id="companyDescription"
          [placeholder]="'COMPANY_DESCRIPTION_PLACEHOLDER' | transloco"
          class="form-input"
          rows="4"
        ></textarea>
        @if(required("companyDescription")) {
        <div class="error">
          {{ 'COMPANY_DESCRIPTION_REQUIRED' | transloco }}
        </div>
        }
      </div>

      <!-- Company website  -->
      <div class="form-group">
        <label for="companyWebsite" class="form-label">
          {{ 'COMPANY_WEBSITE_LABEL' | transloco }}
        </label>
        <input
          formControlName="companyWebsite"
          id="companyWebsite"
          [placeholder]="'COMPANY_WEBSITE_PLACEHOLDER' | transloco"
          class="form-input"
        />
        @if(required("companyWebsite")) {
        <div class="error">
          {{ 'COMPANY_WEBSITE_REQUIRED' | transloco }}
        </div>
        }@else if(matchExp("companyWebsite")) {
        <div class="error">
          {{ 'COMPANY_WEBSITE_INVALID' | transloco }}
        </div>
        }
      </div>

      <!-- Company location  -->
      <div class="form-group">
        <label for="companyLocation" class="form-label">
          {{ 'COMPANY_ADDRESS_LABEL' | transloco }}
        </label>
        <input
          formControlName="companyLocation"
          id="companyLocation"
          [placeholder]="'COMPANY_ADDRESS_PLACEHOLDER' | transloco"
          class="form-input"
        />
        @if(required("companyLocation")) {
        <div class="error">
          {{ 'COMPANY_ADDRESS_REQUIRED' | transloco }}
        </div>
        }
      </div>

      <h4>{{ 'ORGANIZATION_STATUS' | transloco }}</h4>
      <div class="form-group-flex">
        <!-- company founding year -->
        <div class="form-group">
          <label for="companyFoundedYear" class="form-label">
            {{ 'COMPANY_FOUNDED_YEAR_LABEL' | transloco }}
          </label>
          <input
            type="text"
            formControlName="companyFoundedYear"
            id="companyFoundedYear"
            [placeholder]="'COMPANY_FOUNDED_YEAR_PLACEHOLDER' | transloco"
            class="form-input"
          />
          @if(required("companyFoundedYear")) {
          <div class="error">
            {{ 'COMPANY_FOUNDED_YEAR_REQUIRED' | transloco }}
          </div>
          }@else if(matchExp("companyFoundedYear")) {
          <div class="error">
            {{ 'COMPANY_FOUNDED_YEAR_INVALID' | transloco }}
          </div>
          }
        </div>

        <!-- company industry type -->
        <div class="form-group">
          <label for="industryType" class="form-label">
            {{ 'INDUSTRY_TYPE_LABEL' | transloco }}
          </label>
          <input
            type="text"
            formControlName="industryType"
            id="industryType"
            [placeholder]="'INDUSTRY_TYPE_PLACEHOLDER' | transloco"
            class="form-input"
          />

          @if(required("industryType")) {
          <div class="error">
            {{ 'INDUSTRY_TYPE_REQUIRED' | transloco }}
          </div>
          }
        </div>

        <!-- company founders count -->
        <div class="form-group">
          <label for="numberOfFounders" class="form-label">
            {{ 'NUMBER_OF_FOUNDERS_LABEL' | transloco }}
          </label>
          <input
            type="text"
            formControlName="numberOfFounders"
            id="numberOfFounders"
            [placeholder]="'NUMBER_OF_FOUNDERS_PLACEHOLDER' | transloco"
            class="form-input"
          />

          @if(required("numberOfFounders")) {
          <div class="error">
            {{ 'NUMBER_OF_FOUNDERS_REQUIRED' | transloco }}
          </div>
          }
        </div>
      </div>

      <h4>{{ 'EMPLOYEES_STATUS' | transloco }}</h4>
      <div class="form-group-flex">
        <!-- total employees -->
        <div class="form-group">
          <label for="totalEmployees" class="form-label">
            {{ 'TOTAL_EMPLOYEES_LABEL' | transloco }}
          </label>
          <input
            type="text"
            formControlName="totalEmployees"
            id="totalEmployees"
            [placeholder]="'TOTAL_EMPLOYEES_PLACEHOLDER' | transloco"
            class="form-input"
          />

          @if(required("totalEmployees")) {
          <div class="error">
            {{ 'TOTAL_EMPLOYEES_REQUIRED' | transloco }}
          </div>
          }
        </div>
        <!-- total revenue -->
        <div class="form-group">
          <label for="totalRevenue" class="form-label">
            {{ 'TOTAL_REVENUE_LABEL' | transloco }}
          </label>
          <input
            type="text"
            formControlName="totalRevenue"
            id="totalRevenue"
            [placeholder]="'TOTAL_REVENUE_PLACEHOLDER' | transloco"
            class="form-input"
          />

          @if(required("totalRevenue")) {
          <div class="error">
            {{ 'TOTAL_REVENUE_REQUIRED' | transloco }}
          </div>
          }
        </div>
      </div>

      <div class="form-group-flex">
        <!-- total male employees -->
        <div class="form-group">
          <label for="totalMaleEmployees" class="form-label">
            {{ 'TOTAL_MALE_EMPLOYEES_LABEL' | transloco }}
          </label>
          <input
            type="text"
            formControlName="totalMaleEmployees"
            id="totalMaleEmployees"
            [placeholder]="'TOTAL_MALE_EMPLOYEES_PLACEHOLDER' | transloco"
            class="form-input"
          />

          @if(required("totalMaleEmployees")) {
          <div class="error">
            {{ 'TOTAL_MALE_EMPLOYEES_REQUIRED' | transloco }}
          </div>
          }
        </div>

        <!-- total female employees -->
        <div class="form-group">
          <label for="totalFemaleEmployees" class="form-label">
            {{ 'TOTAL_FEMALE_EMPLOYEES_LABEL' | transloco }}
          </label>
          <input
            type="text"
            formControlName="totalFemaleEmployees"
            id="totalFemaleEmployees"
            [placeholder]="'TOTAL_FEMALE_EMPLOYEES_PLACEHOLDER' | transloco"
            class="form-input"
          />

          @if(required("totalFemaleEmployees")) {
          <div class="error">
            {{ 'TOTAL_FEMALE_EMPLOYEES_REQUIRED' | transloco }}
          </div>
          }
        </div>

        <!-- total others employees -->
        <div class="form-group">
          <label for="totalOthersEmployees" class="form-label">
            {{ 'TOTAL_OTHERS_EMPLOYEES_LABEL' | transloco }}
          </label>
          <input
            type="text"
            formControlName="totalOthersEmployees"
            id="totalOthersEmployees"
            [placeholder]="'TOTAL_OTHERS_EMPLOYEES_PLACEHOLDER' | transloco"
            class="form-input"
          />

          @if(required("totalOthersEmployees")) {
          <div class="error">
            {{ 'TOTAL_OTHERS_EMPLOYEES_REQUIRED' | transloco }}
          </div>
          }
        </div>
      </div>

      <h4>{{ 'SOCIAL_MEDIA_HANDLER' | transloco }}</h4>
      <!-- social media handles -->
      <div class="form-group-flex">
        <!-- linkedin -->
        <div class="form-group">
          <label for="linkedIn" class="form-label">
            {{ 'LINKEDIN_LABEL' | transloco }}
          </label>
          <input
            type="text"
            formControlName="linkedIn"
            id="linkedIn"
            [placeholder]="'LINKEDIN_PLACEHOLDER' | transloco"
            class="form-input"
          />
        </div>
        <!-- twitter -->
        <div class="form-group">
          <label for="twitter" class="form-label">
            {{ 'TWITTER_LABEL' | transloco }}
          </label>
          <input
            type="text"
            formControlName="twitter"
            id="twitter"
            [placeholder]="'TWITTER_PLACEHOLDER' | transloco"
            class="form-input"
          />
        </div>
      </div>
      <div class="form-group-flex">
        <!-- facebook -->
        <div class="form-group">
          <label for="facebook" class="form-label">
            {{ 'FACEBOOK_LABEL' | transloco }}
          </label>
          <input
            type="text"
            formControlName="facebook"
            id="facebook"
            [placeholder]="'FACEBOOK_PLACEHOLDER' | transloco"
            class="form-input"
          />
        </div>
        <!-- medium -->
        <div class="form-group">
          <label for="medium" class="form-label">
            {{ 'MEDIUM_LABEL' | transloco }}
          </label>
          <input
            type="text"
            formControlName="medium"
            id="medium"
            [placeholder]="'MEDIUM_PLACEHOLDER' | transloco"
            class="form-input"
          />
        </div>
      </div>

      <h3>
        {{ 'COMPANY_LOCATIONS' | transloco }}
      </h3>
      <div formArrayName="companyLocations">
        @for (location of companyLocations.controls; track $index; let i =$index) {
        <div [formGroupName]="i" class="form-group-flex gaps">
          <!-- country  -->
          <div class="form-group">
            <label class="form-label">
              {{ 'COUNTRY_LABEL' | transloco }}
            </label>
            <select
              formControlName="country"
              class="form-input"
              (change)="getStateList($event, i)"
            >
              <option value="">
                {{ 'SELECT_COUNTRY' | transloco }}
              </option>
              @for(country of countries(); track country.countryId) {
              <option [value]="country.countryId">
                {{ country.countryName }}
              </option>
              }
            </select>
            @if(requiredArray(i,"country")) {
            <div class="error">
              {{ 'COUNTRY_REQUIRED' | transloco }}
            </div>
            }
          </div>
          <!-- state  -->
          <div class="form-group">
            <label class="form-label">
              {{ 'STATE_LABEL' | transloco }}
            </label>
            <select formControlName="state" class="form-input">
              <option value="">
                {{ 'SELECT_STATE' | transloco }}
              </option>
              @for(states of stateLists()[i] || []; track states.stateId) {
              <option [value]="states.stateId">
                {{ states.stateName }}
              </option>
              }
            </select>
            @if(requiredArray(i,"state")) {
            <div class="error">
              {{ 'STATE_REQUIRED' | transloco }}
            </div>
            }
          </div>
          <!-- address -->
          <div class="form-group">
            <div class="form-group">
              <label class="form-label">
                {{ 'ADDRESS_LABEL' | transloco }}
              </label>
              <input
                type="text"
                formControlName="address"
                [placeholder]="'ADDRESS_PLACEHOLDER' | transloco"
                class="form-input"
              />
            </div>
            @if(requiredArray(i,"address")) {
            <div class="error">
              {{ 'AdDRESS_REQUIRED' | transloco }}
            </div>
            }
          </div>
          @if (companyLocations.length > 1) {
          <div>
            <red-button (click)="removeLocation(i)" [data]="removeBtn" />
          </div>
          }
        </div>
        }
      </div>

      <blue-button (click)="addLocation()" [data]="addBtn" />
      <!-- error generated from backend -->
      @if(errorBackEnd().length > 0) {
      <div class="error">
        {{ errorBackEnd() }}
      </div>
      }

      <!-- Submit -->
      <button
        type="submit"
        [disabled]="EditCompanyForm.invalid"
        class="btn-submit"
      >
        {{ 'EDIT_COMPANY_DETAILS' | transloco }}
      </button>
    </form>

    <pre>
    {{ EditCompanyForm.value | json }}
  </pre
    >
  `,
})
export class EditProfileComponent implements OnInit {
  private fb = inject(FormBuilder);
  private sharedService = inject(SharedServices);
  private snackBar = inject(MatSnackBar);

  errorBackEnd = signal('');
  removeBtn: WritableSignal<string> = signal('Remove');
  addBtn: WritableSignal<string> = signal('+ Add Location');
  countries = signal<any[]>([]);
  stateLists = signal<{ [key: number]: any[] }>({});

  EditCompanyForm = this.fb.group({
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
    companyName: [
      '',
      [Validators.required, Validators.pattern(/^[a-zA-Z0-9@%.,"'\s]+$/)],
    ],
    CompanyType: ['', Validators.required],
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
      Validators.required,
      Validators.pattern(/^(19|20)\d{2}$/),
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
    linkedIn: [''],
    twitter: [''],
    facebook: [''],
    medium: [''],
    companyLocations: this.fb.array([this.createLocation()]),
  });

  // factory for one location
  createLocation(): FormGroup {
    return this.fb.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      address: ['', Validators.required],
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
  }

  getCountryList() {
    this.sharedService.getCountryList().subscribe({
      next: (res) => {
        console.log(res.data);
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

  getStateList(event: Event, rowIndex: number) {
    const target = event.target as HTMLSelectElement;
    const countryId = target.value;
    this.sharedService.getStateList(Number(countryId)).subscribe({
      next: (res) => {
        const updated = { ...this.stateLists() };
        updated[rowIndex] = res.data;
        this.stateLists.set(updated);
      },
      error: (err) => {
        this.openSnackBarError(err.error.message);
        this.errorBackEnd.set(
          'Failed to load state list. Please try again later.'
        );
      },
    });
  }

  onSubmit() {
    console.log(this.EditCompanyForm.value);
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
