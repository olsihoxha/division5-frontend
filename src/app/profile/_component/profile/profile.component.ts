import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../../_service/profile.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NavigationComponent} from "../../../nav/navigation/navigation.component";
import {LoaderService} from "../../../common/loader/_service/loader.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  changeUserDataFormGroup: FormGroup;

  constructor(private fb: FormBuilder,
              private profileService: ProfileService,
              private navigationComponent: NavigationComponent,
              private snack: MatSnackBar,) {
  }

  ngOnInit(): void {

    this.navigationComponent.navigationItems[0]['isSelected'] = true;
    this.changeUserDataFormGroup = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      birthdate: [null, Validators.required],
      phone_number: [null, Validators.required],
      address: [null, Validators.required],
      nickname: [null, Validators.required]
    });

    this.getInitialData();

  }


  getInitialData() {
    this.profileService.getMyData().subscribe(
      data => {
        this.changeUserDataFormGroup.patchValue(data['response']);
      },
      error => {
        this.snack.open(error.error, 'Mbyll', {duration: 3000});
      }
    );
  }

  changeData() {
    if (this.changeUserDataFormGroup.valid) {
      this.profileService.updateMyData(this.changeUserDataFormGroup.value).subscribe(
        data => {
          this.snack.open('Perditesimi u krey me sukses', 'Mbyll', {duration: 3000});
        },
        error => {
          {
            this.snack.open(error.error['error'], 'Mbyll', {duration: 3000});
          }
        }
      );
    }
  }


}
