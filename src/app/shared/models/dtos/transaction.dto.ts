import { TransactionType } from '../view-models/transaction.view-model';

export interface TransactionDto {
  transactionType: TransactionType;
  amount: number;
  discount: number;
  total: number;
}
