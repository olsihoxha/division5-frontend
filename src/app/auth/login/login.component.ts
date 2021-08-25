import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../_services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading = false;
  loginForm = new FormGroup({});
  errors: any = {};
  private returnUrl = '';

  // passwordResetEmail: string;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.authService.logout();
    this.returnUrl = '';
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.loading = true;
    const credentials = this.loginForm.value;
    if (this.loginForm.valid) {
      this.authService.login(credentials.email, credentials.password)
        .pipe(first())
        .subscribe(response => {
            this.router.navigate([this.returnUrl]);
          },
          (error) => {
            this.loading = false;
            this.snackBar.open(error.error.non_field_errors[0], 'Mbyll', {duration: 3000});
            this.loginForm.controls['email'].setErrors({});
            this.loginForm.controls['password'].setErrors({});
          });
    }else{
      this.loading = false;
    }

  }

  hideErrors() {
    this.loginForm.controls['email'].setErrors(null);
    this.loginForm.controls['password'].setErrors(null);
  }

  // resetPassword(){
  //   const dialogRef = this.dialog.open(ResetPasswordDialogComponent, {
  //     width: '350px',
  //     data: {passwordResetEmail: this.passwordResetEmail}
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.passwordResetEmail = result;
  //   });
  // }

  registerAsExpert(){
    this.router.navigate(['/login/expert-register']);
  }
  registerAsCustomer(){
    this.router.navigate(['/login/customer-register']);
  }

}
