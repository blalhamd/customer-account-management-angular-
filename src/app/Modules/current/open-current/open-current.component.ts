import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrentService } from '../../../shared/services/current.service';
import { Router } from '@angular/router';
import { CreateCurrentDto } from '../../../shared/models/dtos/create-current.dto';
import { CurrencyType } from '../../../shared/models/view-models/current-view-model';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-open-current',
  templateUrl: './open-current.component.html',
  styleUrl: './open-current.component.css',
})
export class OpenCurrentComponent implements OnInit {
  model!: FormGroup;
  errorMessage = '';
  isLoading = false;

  // Expose currency enum to template
  currencyTypes = Object.values(CurrencyType);

  constructor(
    private currentService: CurrentService,
    private router: Router,
    private fb: FormBuilder,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.model = this.fb.group({
      currencyType: [null, Validators.required],
      balance: [0, [Validators.required, Validators.min(0)]],
      isBusinessAccount: [false, Validators.required],
    });
  }

  onSubmit(): void {
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

    const dto: CreateCurrentDto = {
      currencyType: this.model.value.currencyType.toUpperCase(),
      balance: parseFloat(this.model.value.balance),
      isBusinessAccount: this.model.value.isBusinessAccount,
    };

    this.currentService.openCurrent(dto).subscribe({
      next: (res) => {
        console.log(res);
        this.alert.success('Currnt Account Opened Successfully');
        setTimeout(() => {
          this.router.navigate(['/blank']);
        }, 3000);
      },
      error: (err) => {
        this.errorMessage = err?.error?.Message || 'An error occurred.';
        this.alert.error(this.errorMessage);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
