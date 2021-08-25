import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  productFilterForm : FormGroup;

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.productFilterForm = this.getFilterForm();
  }


  getFilterForm() {
    return this.fb.group({
      name: [null, [Validators.maxLength(150)]],
    })
  }


  searchService() {

  }


  clearServiceFilters(){

  }


}
