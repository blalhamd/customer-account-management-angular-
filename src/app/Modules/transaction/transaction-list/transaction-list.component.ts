import { Component, OnInit } from '@angular/core';
import { TransactionViewModel } from '../../../shared/models/view-models/transaction.view-model';
import { TransactionService } from '../../../shared/services/transaction.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css',
})
export class TransactionListComponent implements OnInit {
  transactions: TransactionViewModel[] = [];
  errorMessage: string = '';
  pageNumber: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  constructor(
    private transactionService: TransactionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.transactionService.getAll(this.pageNumber, this.pageSize).subscribe({
      next: (res) => {
        this.transactions = res.items;
        this.pageNumber = res.pageNumber;
        this.pageSize = res.pageSize;
        this.totalPages = res.totalPages;
      },
      error: (err) => {
        this.errorMessage = err.error?.Message || 'Something went wrong';
      },
    });
  }

  trackById(index: number, transaction: TransactionViewModel): string {
    return transaction.id;
  }

  canView(roles: string[]): boolean {
    return this.authService.hasRole(roles);
  }

  changePage(page: number): void {
    if (
      page === this.pageNumber ||
      page < 1 ||
      (this.totalPages && page > this.totalPages)
    ) {
      return;
    }
    this.pageNumber = page;
    this.transactionService.getAll(this.pageNumber, this.pageSize).subscribe({
      next: (res) => {
        this.transactions = res.items;
        this.pageNumber = res.pageNumber;
        this.pageSize = res.pageSize;
        this.totalPages = res.totalPages;
      },
      error: (err) => {
        this.errorMessage = err.error?.Message || 'Something went wrong';
      },
    });
  }
  get pages(): number[] {
    return this.totalPages
      ? Array(this.totalPages)
          .fill(0)
          .map((x, i) => i + 1)
      : [];
  }
}
