import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FixedDepositService } from '../../../shared/services/fixed-deposit.service';
import { FixedDepositDto } from '../../../shared/models/dtos/fixed-deposit.dto';
import { CurrencyType } from '../../../shared/models/view-models/current-view-model';
import { Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-create-fixed-deposit',
  templateUrl: './create-fixed-deposit.component.html',
  styleUrl: './create-fixed-deposit.component.css',
})
export class CreateFixedDepositComponent implements OnInit {
  model!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;
  // Expose currency enum to template
  currencyTypes = Object.values(CurrencyType);
  constructor(
    private fb: FormBuilder,
    private fixedService: FixedDepositService,
    private router: Router,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.model = this.fb.group({
      currencyType: [null, [Validators.required]],
      depositAmount: [0, [Validators.required, Validators.min(0)]],
      termInMonths: [0, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit() {
    console.log(this.model.value);
    if (this.model.invalid) {
      this.model.markAllAsTouched();
      return;
    }

    const confirmed = this.alert.confirm(
      'Are you sure you want to submit the form?'
    );
    if (!confirmed) return;

    this.isLoading = true;

    const dto: FixedDepositDto = {
      currencyType: this.model.value.currencyType,
      depositAmount: parseFloat(this.model.value.depositAmount),
      termInMonths: this.model.value.termInMonths,
    };

    this.fixedService.openFixedDeposit(dto).subscribe({
      next: (res) => {
        console.log(res);
        this.alert.success('Fixed Account registered Successfully');
        setTimeout(() => {
          this.router.navigate(['/blank']);
        }, 3000);
      },
      error: (err) => {
        this.errorMessage = err.error?.Message || 'Something is wrong';
        this.alert.error(this.errorMessage);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
