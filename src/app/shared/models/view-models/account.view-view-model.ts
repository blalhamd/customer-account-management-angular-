import { TransactionDto } from '../dtos/transaction.dto';

export interface AccountViewViewModel {
  id: string;
  accountNumber: string;
  clientId: string;
  currencyType: string;
  balance: number;
  branch: string;
  accountStatus: string;
  isSigned: boolean;
  transactions: TransactionDto[];
}
