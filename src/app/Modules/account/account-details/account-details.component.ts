import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountViewViewModel } from '../../../shared/models/view-models/account.view-view-model';
import { AccountService } from '../../../shared/services/account.service';
import { TransactionType } from '../../../shared/models/view-models/transaction.view-model';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.css',
})
export class AccountDetailsComponent implements OnInit {
  accountId: string | null = null;
  account?: AccountViewViewModel;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.accountId = params.get('id');
      if (this.accountId) {
        this.getAccount();
      }
    });
  }

  getAccount() {
    if (!this.accountId) return;
    this.errorMessage = '';
    this.isLoading = true;
    this.accountService.getById(this.accountId).subscribe({
      next: (res) => {
        this.account = res;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Something went wrong';
        this.isLoading = false;
      },
    });
  }

  getTransactionTypeName(type: number): string {
    // Assumes TransactionType is an enum where the value and key are the same
    return TransactionType[type];
  }
}
