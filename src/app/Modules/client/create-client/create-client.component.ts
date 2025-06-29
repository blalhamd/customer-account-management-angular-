import { Gender } from './../../../shared/models/dtos/create-client.dto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../../shared/services/client.service';
import { passwordValidator } from '../../../shared/validations/password.validator';
import { CreateClientDto } from '../../../shared/models/dtos/create-client.dto';
import { Router } from '@angular/router';
import { ssnValidator } from '../../../shared/validations/ssn.validator';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrl: './create-client.component.css',
})
export class CreateClientComponent implements OnInit {
  model!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;
  selectedFile: File | null = null; // Hold the file here

  genderOptions: Gender[] = ['UnKnown', 'Male', 'Female'];

  getControl(path: string): any {
    return this.model.get(path);
  }

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.model = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, passwordValidator()]],
      fullName: [null, [Validators.required]],
      sSN: [null, [Validators.required, ssnValidator()]],
      // imagePath: [null, [Validators.required]],
      address: this.fb.group({
        country: [null, Validators.required],
        city: [null, Validators.required],
        street: [null, Validators.required],
        zipCode: [null, Validators.required],
      }),
      nationality: [null, Validators.required],
      gender: ['UnKnown', Validators.required],
      birthDate: [null, Validators.required],
      jobTitle: [null, Validators.required],
      monthlyIncome: [null, [Validators.required, Validators.min(0)]],
      financialSource: [0, [Validators.required, Validators.min(0)]],
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('Selected file:', this.selectedFile); // Should log a File object!
    }
  }

  resetForm(): void {
    this.model.reset({
      gender: 'UnKnown',
      monthlyIncome: 0,
      financialSource: 0,
    });
    this.errorMessage = '';
  }

  submit(form: FormGroup) {
    console.log('before submit, imagePath:', this.model.value.imagePath);
    this.isLoading = true;

    if (this.model.invalid) {
      this.model.markAllAsTouched();
      this.isLoading = false;
      return;
    }

    if (!this.alert.confirm('Are you sure you want to submit the form?')) {
      return;
    }

    console.log(form.value);

    const formValue = form.value;
    const dto: CreateClientDto = {
      ...formValue,
      birthDate: new Date(formValue.birthDate),
    };

    this.clientService.registerClient(dto, this.selectedFile).subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        this.resetForm();
        this.alert.success('Client registered successfully');
        setTimeout(() => {
          this.router.navigate(['/client/list']);
        }, 3000);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.Message || 'Something went wrong!';
        this.alert.error(this.errorMessage);
      },
    });
  }
}
