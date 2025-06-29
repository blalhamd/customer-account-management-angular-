import { TransactionType } from '../view-models/transaction.view-model';

export interface CreateTransactionDto {
  accountNumber: string;
  to?: string;
  transactionType: TransactionType;
  amount?: number;
}
