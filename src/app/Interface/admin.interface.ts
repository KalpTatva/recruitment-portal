export interface EditAdminProfile {
  userId: number;
  companyId: number;

  email: string;
  userName: string;
  phone: number;
  countryCode: string;

  companyName: string;
  companyType: string;
  companyDescription: string;
  companyWebsite: string;
  companyLocation: string;
  companyFoundedYear: number;
  industryType: string;
  numberOfFounders: number;
  totalEmployees: number;
  totalMaleEmployees: number;
  totalFemaleEmployees: number;
  totalOthersEmployees: number;
  totalRevenue: number;
  linkedIn: string;
  twitter: string;
  facebook: string;
  medium: string;

  companyLocations: Array<{
    companyLocationId: number | 0;
    countryId: number;
    stateId: number;
    cityId: number;
    address: string;
  }>;
}



export interface CompanyProfile {
  userId?: number;
  companyId?: number;

  email?: string;
  userName?: string;
  phone?: number;
  countryCode?: string;

  imageUrl: string;
  companyName: string;
  companyType: string;
  companyDescription: string;
  companyWebsite: string;
  companyLocation: string;
  companyFoundedYear: number;
  industryType: string;
  numberOfFounders: number;
  totalEmployees: number;
  totalMaleEmployees: number;
  percentMale: number;
  totalFemaleEmployees: number;
  percentFemale:  number;
  totalOthersEmployees: number;
  percentOther: number;
  totalRevenue: number;
  linkedIn: string;
  twitter: string;
  facebook: string;
  medium: string;

  companyLocations: Array<{
    companyLocationId: number | 0;
    countryId: number;
    country : string;
    stateId: number;
    state : string;
    cityId: number;
    city: string;
    address: string;
  }>;
}
