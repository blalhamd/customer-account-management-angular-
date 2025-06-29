import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { ResetRequestDto } from '../../../shared/models/dtos/reset-request.dto';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent implements OnInit {
  model!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  get email() {
    return this.model.get('email');
  }

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.model = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  onSubmit(model: FormGroup) {
    if (model.valid) {
      this.isLoading = true; // Show spinner
      this.errorMessage = ''; // Clear previous errors
      const email = model.value.email;
      var payLoad: ResetRequestDto = {
        email: email,
      };
      this._authService.requestReset(payLoad).subscribe({
        next: () => {
          this.isLoading = false; // Hide spinner on success
          this._router.navigate(['/auth/verify'], { state: { data: email } });
        },
        error: (err) => {
          this.isLoading = false; // Hide spinner on error
          this.errorMessage =
            'Error: ' + err.error?.Message || 'Something went wrong.';
        },
      });
    }
  }
}
