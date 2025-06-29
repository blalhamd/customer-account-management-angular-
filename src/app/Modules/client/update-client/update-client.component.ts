import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CreateClientDto,
  Gender,
} from '../../../shared/models/dtos/create-client.dto';
import { ClientService } from '../../../shared/services/client.service';
import { ssnValidator } from '../../../shared/validations/ssn.validator';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrl: './update-client.component.css',
})
export class UpdateClientComponent implements OnInit {
  form!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;
  clientId: string = '';
  genderOptions: Gender[] = ['UnKnown', 'Male', 'Female'];
  currentImageUrl: string = '';
  private subscriptions: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadClientData();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      fullName: ['', [Validators.required]],
      sSN: ['', [Validators.required, ssnValidator()]],
      imageFile: [null], // Changed from imagePath to handle File objects
      imagePath: [''], // Keep this for the URL/path
      address: this.fb.group({
        country: ['', Validators.required],
        city: ['', Validators.required],
        street: ['', Validators.required],
        zipCode: ['', Validators.required],
      }),
      nationality: ['', Validators.required],
      gender: ['UnKnown', Validators.required],
      birthDate: ['', Validators.required],
      jobTitle: ['', Validators.required],
      monthlyIncome: [0, [Validators.required, Validators.min(0)]],
      financialSource: [0, [Validators.required, Validators.min(0)]],
    });
  }

  private loadClientData(): void {
    this.isLoading = true;
    this.subscriptions.add(
      this.route.params.subscribe({
        next: (params) => {
          this.clientId = params['id'];
          if (this.clientId) {
            this.fetchClientDetails(this.clientId);
          } else {
            this.isLoading = false;
          }
        },
        error: () => {
          this.errorMessage = 'Failed to load client ID';
          this.alert.error(this.errorMessage);
          this.isLoading = false;
        },
      })
    );
  }

  private fetchClientDetails(clientId: string): void {
    this.subscriptions.add(
      this.clientService.getById(clientId).subscribe({
        next: (res) => {
          this.currentImageUrl = res.imagePath; // Store the image URL for display
          this.patchFormValues(res);
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage =
            err.error?.Message || 'Failed to load client data';
          this.alert.error(this.errorMessage);
          this.isLoading = false;
        },
      })
    );
  }

  private patchFormValues(clientData: any): void {
    try {
      const birthDate = clientData.birthDate
        ? new Date(clientData.birthDate).toISOString().split('T')[0]
        : null;

      const gender = this.genderOptions.includes(clientData.gender)
        ? clientData.gender
        : 'UnKnown';

      this.form.patchValue({
        fullName: clientData.fullName,
        jobTitle: clientData.jobTitle,
        address: {
          city: clientData.address?.city || '',
          country: clientData.address?.country || '',
          street: clientData.address?.street || '',
          zipCode: clientData.address?.zipCode || '',
        },
        birthDate: birthDate,
        monthlyIncome: clientData.monthlyIncome || 0,
        nationality: clientData.nationality || '',
        sSN: clientData.ssn || clientData.sSN || '',
        // imagePath: clientData.imagePath || '', // Store path but don't use for file input
        financialSource: clientData.financialSource || 0,
        gender: gender,
      });
    } catch (error) {
      console.error('Error patching form values:', error);
      this.errorMessage = 'Error loading client data';
      this.alert.error(this.errorMessage);
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      this.form.patchValue({
        imageFile: file,
      });
      this.form.get('imageFile')?.updateValueAndValidity();

      // Preview the image
      const reader = new FileReader();
      reader.onload = () => {
        this.currentImageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  resetForm(): void {
    if (confirm('Are you sure you want to reset all changes?')) {
      this.form.reset({
        gender: 'UnKnown',
        monthlyIncome: 0,
        financialSource: 0,
      });
      this.errorMessage = '';
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (!this.alert.confirm('Are you sure you want to update this client?')) {
      return;
    }

    this.isLoading = true;
    const formValue = this.prepareSubmitData();

    this.subscriptions.add(
      this.clientService.updateClient(this.clientId, formValue).subscribe({
        next: () => this.handleSuccess(),
        error: (err) => this.handleError(err),
      })
    );
  }

  private prepareSubmitData(): CreateClientDto {
    return {
      ...this.form.value,
      birthDate: new Date(this.form.value.birthDate),
    };
  }

  private handleSuccess(): void {
    this.isLoading = false;
    this.alert.success(`Client Updated Successfully`);
    this.router.navigate(['/client/list'], {
      queryParams: { refresh: new Date().getTime() },
    });
  }

  private handleError(err: any): void {
    this.isLoading = false;
    this.errorMessage = err.error?.Message || 'An unexpected error occurred';
    console.error('Update error:', err);
    this.alert.error(this.errorMessage);
  }

  // Helper method for template access
  getControl(path: string) {
    return this.form.get(path);
  }
}
