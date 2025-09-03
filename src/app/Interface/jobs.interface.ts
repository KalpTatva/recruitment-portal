export interface JobListsInterface {
  imageUrl: string;
  companyName: string;
  jobTitle: string;
  jobRole: string;
  jobType: string;
  jobCategory: string;
  address: string;
  minSalary: number;
  maxSalary: number;
  applicationStartDate: Date;
  applicationEndDate: Date;
  experience: number;
  createdAt: string;
}

export interface CityInterface {
  cityId: number;
  cityName: string;
}

export interface categoriesFilterInterface {
  jobCategoryId : number;
  categoryName: string;
}

export interface jobTypeInterface {
  jobTypeId : number;
  jobType1 : string;
}

export interface SearchParamsInterface {
  categoryId?: number,
  searchInput?: string,
  Location?: number,
  jobType?: number,
  experience?: number,
  datePost?: number
}

