import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { passwordValidator } from '../../../shared/validations/password.validator';
import { ResetPasswordDto } from '../../../shared/models/dtos/reset-password.dto';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {
  model!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;
  token: string = '';
  showPassword: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.token = history.state.data;
  }

  buildForm() {
    this.model = this._fb.group({
      newPassword: [null, [Validators.required, passwordValidator()]],
    });
  }

  get newPassword() {
    return this.model.get('newPassword');
  }

  onSubmit() {
    if (this.model.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      const payLoad: ResetPasswordDto = {
        newPassword: this.model.value.newPassword,
        token: this.token,
      };
      this._authService.resetPassword(payLoad).subscribe({
        next: () => {
          this.isLoading = false;
          this._router.navigate(['/auth/login']);
          // Optionally: this.model.reset();
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMessage =
            err?.error?.Message ||
            err?.error?.message ||
            'Something went wrong. Please try again.';
        },
      });
    } else {
      this.model.markAllAsTouched();
    }
  }
}
