import { Component, OnInit } from '@angular/core';
import { CurrentService } from '../../../shared/services/current.service';
import {
  AccountStatus,
  CurrentViewModel,
} from '../../../shared/models/view-models/current-view-model';
import { CurrentQueryDto } from '../../../shared/models/dtos/current-query.dto';
import { AccountService } from '../../../shared/services/account.service';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-current-list',
  templateUrl: './current-list.component.html',
  styleUrl: './current-list.component.css',
})
export class CurrentListComponent implements OnInit {
  currents: CurrentViewModel[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  errorMessage: string = '';
  statusMessage: string = ''; // <-- Add this for operation feedback

  constructor(
    private currentService: CurrentService,
    private accountService: AccountService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.loadPage(this.pageNumber);
  }

  loadPage(page: number) {
    this.pageNumber = page;
    const q: CurrentQueryDto = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
    };
    this.currentService.getCurrents(q).subscribe({
      next: (res) => {
        this.currents = res.items;
        this.totalPages = res.totalPages;
      },
      error: (err) => {
        this.errorMessage = err.error?.Message || 'Something went wrong!';
        this.alert.error(this.errorMessage);
        this.statusMessage = '';
      },
    });
  }

  trackById(index: number, current: CurrentViewModel): string {
    return current.id;
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
        this.statusMessage = '';
        this.alert.error(this.errorMessage);
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
        this.alert.error(this.errorMessage);
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

  get pages(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }
}
