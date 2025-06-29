import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../../shared/services/transaction.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateTransactionDto } from '../../../shared/models/dtos/create-transaction.dto';
import { TransactionType } from '../../../shared/models/view-models/transaction.view-model';
import { Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrl: './create-transaction.component.css',
})
export class CreateTransactionComponent implements OnInit {
  form!: FormGroup;
  errorMessage = '';
  isLoading = false;
  transactionTypes = Object.keys(TransactionType).filter((v) =>
    isNaN(Number(v))
  );

  constructor(
    private transactionService: TransactionService,
    private fb: FormBuilder,
    private router: Router,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      accountNumber: [null, [Validators.required]],
      transactionType: [null, [Validators.required]],
      amount: [0],
      to: [null],
    });

    // Listen for transactionType changes to update form dynamically
    this.form.get('transactionType')?.valueChanges.subscribe((type) => {
      this.updateFormFields(type);
    });
  }

  updateFormFields(type: TransactionType) {
    // Reset validators
    this.form.get('amount')?.clearValidators();
    this.form.get('to')?.clearValidators();

    if (
      type === TransactionType.Deposit ||
      type === TransactionType.Withdrawal
    ) {
      this.form
        .get('amount')
        ?.setValidators([Validators.required, Validators.min(0)]);
      this.form.get('to')?.setValue(null);
    } else if (type === TransactionType.Transfer) {
      this.form
        .get('amount')
        ?.setValidators([Validators.required, Validators.min(0)]);
      this.form.get('to')?.setValidators([Validators.required]);
    } else if (type === TransactionType.Query) {
      this.form.get('amount')?.setValue(null);
      this.form.get('to')?.setValue(null);
    }

    this.form.get('amount')?.updateValueAndValidity();
    this.form.get('to')?.updateValueAndValidity();
  }

  onSubmit(): void {
    console.log(this.form.value);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    const dto: CreateTransactionDto = {
      accountNumber: this.form.value['accountNumber'],
      transactionType: this.form.value['transactionType'],
      amount: this.form.value['amount'] ?? 0,
      to: this.form.value['to'],
    };

    if (this.form.value['to']) {
      dto.to = this.form.value['to'];
    }
    // For Query, don't send 'amount' or 'to'
    if (dto.transactionType === TransactionType.Query) {
      delete dto.amount;
      delete dto.to;
    }
    if (
      dto.transactionType === TransactionType.Deposit ||
      dto.transactionType === TransactionType.Withdrawal
    ) {
      delete dto.to;
    }

    this.transactionService.makeTransaction(dto).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.form.reset();
        this.errorMessage = '';
        console.log(`res: ${res}`);
        this.alert.success('Transaction executed Successfully');
        setTimeout(() => {
          this.router.navigate(['/client/transaction/result'], {
            state: { data: res },
          });
        }, 3000);
      },
      error: (err) => {
        this.errorMessage =
          err?.error?.message || err?.message || 'Something went wrong';
        this.isLoading = false;
      },
    });
  }

  get accountNumber() {
    return this.form.get('accountNumber');
  }
  get transactionType() {
    return this.form.get('transactionType');
  }
  get amount() {
    return this.form.get('amount');
  }
  get to() {
    return this.form.get('to');
  }
}
