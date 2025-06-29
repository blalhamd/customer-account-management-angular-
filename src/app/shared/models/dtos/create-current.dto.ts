import { CurrencyType } from '../view-models/current-view-model';

export interface CreateCurrentDto {
  currencyType: CurrencyType;
  balance: number;
  isBusinessAccount: boolean;
}
