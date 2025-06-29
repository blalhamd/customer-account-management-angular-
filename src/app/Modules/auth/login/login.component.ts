import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordValidator } from '../../../shared/validations/password.validator';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../shared/services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  model!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;
  get email() {
    return this.model.get('email');
  }

  get password() {
    return this.model.get('password');
  }

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.model = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, passwordValidator()]],
    });
  }

  onSubmit(model: FormGroup) {
    if (model.valid) {
      this.isLoading = true; // Show spinner
      this.errorMessage = ''; // Clear previous errors

      this._authService.login(model.value).subscribe({
        next: (res) => {
          this.isLoading = false; // Hide spinner on success
          this._authService.setToken(res.token);
          this._authService.decodeUserData();
          this._router.navigate(['/']);
        },
        error: (err) => {
          this.isLoading = false; // Hide spinner on error
          this.errorMessage = err.error?.Message || 'Something went wrong.';
          this.alert.error(this.errorMessage);
        },
      });
    }
  }
}
