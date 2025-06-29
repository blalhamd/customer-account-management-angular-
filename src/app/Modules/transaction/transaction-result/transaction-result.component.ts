import { Component, OnInit } from '@angular/core';
import { TransactionViewModel } from '../../../shared/models/view-models/transaction.view-model';

@Component({
  selector: 'app-transaction-result',
  templateUrl: './transaction-result.component.html',
  styleUrl: './transaction-result.component.css',
})
export class TransactionResultComponent implements OnInit {
  result!: TransactionViewModel;
  constructor() {}

  ngOnInit(): void {
    this.result = history.state.data;

    if (!this.result) {
      console.warn('No data found in navigation state.');
    }
  }
}
