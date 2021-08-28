import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SignUpService} from "../../_service/sign-up.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  loading = false;
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder,
              private signUpService: SignUpService,
              public dialogRef: MatDialogRef<SignUpComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      birthdate: [null, Validators.required],
      phone_number: [null, Validators.required],
      address: [null, Validators.required],
      nickname: [null, Validators.required]
    });
  }

  signUp() {
    this.signUpService.createUser(this.signUpForm.value).subscribe(
      data => {
        console.log(data);
      }
    );
  }


}
