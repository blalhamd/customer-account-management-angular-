import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionViewModel } from '../../../shared/models/view-models/transaction.view-model';
import { TransactionService } from '../../../shared/services/transaction.service';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.css',
})
export class TransactionDetailsComponent implements OnInit {
  transactionDetails!: TransactionViewModel;
  loading = false;
  errorMessage: string = '';
  constructor(
    private route: ActivatedRoute,
    private transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.fetchDetails(id);
      } else {
        this.errorMessage = 'No transaction ID provided.';
      }
    });
  }

  fetchDetails(id: string): void {
    this.loading = true;
    this.transactionService.getById(id).subscribe({
      next: (res) => {
        this.transactionDetails = res;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err?.error?.Message || 'Something went wrong';
        this.loading = false;
      },
    });
  }
}
