import { Component, OnInit } from '@angular/core';
import { FixedDepositService } from '../../../shared/services/fixed-deposit.service';
import { FixedDepositViewmodel } from '../../../shared/models/view-models/fixed-deposit.viewmodel';
import { FixedDepositQuery } from '../../../shared/models/dtos/fixed-deposit-query';
import { AccountService } from '../../../shared/services/account.service';
import { AccountStatus } from '../../../shared/models/view-models/current-view-model';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-fixed-deposit-list',
  templateUrl: './fixed-deposit-list.component.html',
  styleUrl: './fixed-deposit-list.component.css',
})
export class FixedDepositListComponent implements OnInit {
  list: FixedDepositViewmodel[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  errorMessage: string = '';
  statusMessage: string = '';
  constructor(
    private fixedService: FixedDepositService,
    private accountService: AccountService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.loadPage(this.pageNumber);
  }

  loadPage(page: number) {
    this.pageNumber = page;
    const q: FixedDepositQuery = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      searchBy: '',
    };
    this.fixedService.getAll(q).subscribe({
      next: (res) => {
        this.list = res.items;
        this.totalPages = res.totalPages;
      },
      error: (err) =>
        (this.errorMessage = err.error?.Message || 'Somthing went wrong!'),
    });
  }

  trackById(index: number, fixed: FixedDepositViewmodel): string {
    return fixed.id;
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.loadPage(page);
  }

  active(id: string) {
    this.accountService
      .changeAccountStatus(id, AccountStatus.Active)
      .subscribe({
        next: () => {
          this.statusMessage = 'Account activated successfully!';
          this.alert.success(this.statusMessage);
          this.errorMessage = '';
          this.loadPage(this.pageNumber);
          this.clearStatusMessage();
        },
        error: (err) => {
          this.errorMessage = err.error?.Message || 'Something went wrong!';
          this.alert.error(this.errorMessage);
          this.statusMessage = '';
          this.clearStatusMessage();
        },
      });
  }

  signed(id: string) {
    this.accountService.flagAccountSigned(id).subscribe({
      next: () => {
        this.statusMessage = 'Account signed successfully!';
        this.alert.success(this.statusMessage);
        this.errorMessage = '';
        this.loadPage(this.pageNumber);
        this.clearStatusMessage();
      },
      error: (err) => {
        this.errorMessage = err.error?.Message || 'Something went wrong!';
        this.alert.error(this.errorMessage);
        this.statusMessage = '';
        this.clearStatusMessage();
      },
    });
  }

  close(id: string) {
    this.accountService.closeAccount(id).subscribe({
      next: () => {
        this.statusMessage = 'Account closed successfully!';
        this.alert.success(this.statusMessage);
        this.errorMessage = '';
        this.loadPage(this.pageNumber);
        this.clearStatusMessage();
      },
      error: (err) => {
        this.errorMessage = err.error?.Message || 'Something went wrong!';
        this.alert.success(this.errorMessage);
        this.statusMessage = '';
        this.clearStatusMessage();
      },
    });
  }

  /** Optional: Clear status message after a delay */
  clearStatusMessage() {
    setTimeout(() => {
      this.statusMessage = '';
      this.errorMessage = '';
    }, 4000); // Message disappears after 4 seconds
  }
}
