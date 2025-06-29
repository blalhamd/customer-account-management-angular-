export interface TransactionViewModel {
  id: string;
  accountId: string;
  transactionType: TransactionType;
  amount: number;
  discount: number;
  total: number;
}

export enum TransactionType {
  Deposit,
  Withdrawal,
  Transfer,
  Payment,
  Query,
  Fee,
}
