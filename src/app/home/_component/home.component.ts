import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../entities/Product";
import {ProductsService} from "../_services/products.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {LoaderComponent} from "../../common/loader/loader/loader.component";
import loader from "@angular-devkit/build-angular/src/webpack/plugins/single-test-transform";
import {LoaderService} from "../../common/loader/_service/loader.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  productFilterForm: FormGroup;
  productList: Product[];
  serviceResultsLength = 0;
  servicePageSize = 10;
  @ViewChild('paginatorService', {static: true}) servicePaginator: MatPaginator;
  @ViewChild('sortService', {static: true}) serviceSort: MatSort;

  serviceDisplayedColumns: string[] = ['image', 'title', 'current_price', 'stars'];

  constructor(private fb: FormBuilder,
              private productService: ProductsService,
              private loaderService: LoaderService) {

  }

  ngOnInit(): void {
    this.productFilterForm = this.getFilterForm();
    this.loaderService.show();
    this.getProducts();
  }


  getProducts() {
    this.productService.getProducts(this.servicePaginator, this.serviceSort, this.productFilterForm).subscribe(
      data => {
        this.productList = data['results'];
        this.serviceResultsLength = data['count'];
        this.loaderService.hide();
      }
    );
  }


  getFilterForm() {
    return this.fb.group({
      name: [null, [Validators.maxLength(150)]],
    })
  }


  searchProducts() {
    this.getProducts();
  }


  clearServiceFilters() {

  }


}
