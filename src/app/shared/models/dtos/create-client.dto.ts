export interface CreateClientDto {
  email: string;
  password: string;
  fullName: string;
  sSN: string;
  imagePath: File | null;
  address: Address;
  nationality: string;
  gender: Gender;
  birthDate: Date;
  jobTitle: string;
  monthlyIncome: number;
  financialSource: number;
}

export interface Address {
  country: string;
  city: string;
  street: string;
  zipCode: string;
}

export type Gender = 'UnKnown' | 'Male' | 'Female';
