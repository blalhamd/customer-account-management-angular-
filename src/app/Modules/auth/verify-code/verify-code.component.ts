import { VerifyResetCodeDto } from './../../../shared/models/dtos/verify-reset-code.dto';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Console } from 'console';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.css',
})
export class VerifyCodeComponent implements OnInit {
  model!: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;
  email: string = '';
  get code() {
    return this.model.get('code');
  }

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();

    this.email = history.state.data;
    console.log(this.email);
  }

  buildForm() {
    this.model = this._fb.group({
      code: [null, [Validators.required]],
    });
  }

  onSubmit(model: FormGroup) {
    if (model.valid) {
      this.isLoading = true; // Show spinner
      this.errorMessage = ''; // Clear previous errors

      const payload: VerifyResetCodeDto = {
        email: this.email,
        code: this.model.value.code,
      };
      console.log(payload);
      this._authService.verifyResetCode(payload).subscribe({
        next: (res) => {
          this.isLoading = false; // Hide spinner on success
          console.log(res.token);
          const token = res.token;
          this._router.navigate(['/auth/reset'], { state: { data: token } });
        },
        error: (err) => {
          this.isLoading = false; // Hide spinner on error
          this.errorMessage =
            'Error: ' + err.error?.Message || 'Something went wrong.';
        },
      });
    }
  }

  resendCode() {}
}
