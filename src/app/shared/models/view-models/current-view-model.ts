export interface CurrentViewModel {
  id: string;
  accountNumber: string;
  clientId: string;
  currencyType: CurrencyType;
  balance: number;
  branch: string;
  accountStatus: AccountStatus;
  isSigned: boolean;
  maximumWithdrawal: number;
  minimumBalance: number;
  isBusinessAccount: boolean;
  monthlyFee: number;
  transactionLimit: number;
}

export enum CurrencyType {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  JPY = 'JPY',
  CAD = 'CAD',
}

export enum AccountStatus {
  Active = 'Active',
  InActive = 'InActive',
  Closed = 'Closed',
  Suspended = 'Suspended',
  Pending = 'Pending',
}
