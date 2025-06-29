import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '../../../shared/services/account.service';
import { AccountViewModel } from '../../../shared/models/view-models/account.view-model';

@Component({
  selector: 'app-clients-account-list',
  templateUrl: './clients-account-list.component.html',
  styleUrl: './clients-account-list.component.css',
})
export class ClientsAccountListComponent implements OnInit {
  clientId: string | null = '';
  errorMessage: string = '';
  items: AccountViewModel[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  isLoading: boolean = false;

  constructor(
    private activate: ActivatedRoute,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.activate.queryParamMap.subscribe((params) => {
      const id = params.get('id');
      if (id !== this.clientId) {
        this.clientId = id;
        this.pageNumber = 1; // reset to first page if client changes
        this.getAccounts();
      }
    });
  }

  getAccounts(): void {
    if (!this.clientId) return;
    this.isLoading = true;
    this.errorMessage = '';
    this.accountService
      .getAccountsForClient(this.clientId, this.pageNumber, this.pageSize)
      .subscribe({
        next: (res) => {
          this.items = res.items || [];
          this.pageNumber = res.pageNumber;
          this.pageSize = res.pageSize;
          this.totalPages = res.totalPages;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || 'Something went wrong';
          this.isLoading = false;
        },
      });
  }

  goToPage(page: number): void {
    if (page !== this.pageNumber && page > 0 && page <= this.totalPages) {
      this.pageNumber = page;
      this.getAccounts();
    }
  }
}
