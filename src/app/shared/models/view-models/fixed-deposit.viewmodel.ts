import { AccountStatus, CurrencyType } from './current-view-model';

export interface FixedDepositViewmodel {
  id: string;
  accountNumber: string;
  clientId: string;
  currencyType: CurrencyType;
  balance: number;
  branch: string;
  accountStatus: AccountStatus;
  isSigned: boolean;
  depositAmount: number;
  interestEarned: number; // الفائده المكتسبه
}
