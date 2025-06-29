import { Address, Gender } from '../dtos/create-client.dto';

export interface ClientViewModel {
  id: string;
  fullName: string;
  ssn: string;
  imagePath: string;
  address: Address;
  nationality: string;
  gender: Gender;
  birthDate: Date; // DateOnly in C# becomes Date in TypeScript
  jobTitle: string;
  monthlyIncome: number;
  financialSource: number;
}

export interface PaginedResponse<T> {
  items: T;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
