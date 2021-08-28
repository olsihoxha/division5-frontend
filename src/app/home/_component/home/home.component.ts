import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../../entities/Product";
import {ProductsService} from "../../_services/products.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {LoaderComponent} from "../../../common/loader/loader/loader.component";
import loader from "@angular-devkit/build-angular/src/webpack/plugins/single-test-transform";
import {LoaderService} from "../../../common/loader/_service/loader.service";
import {NavigationComponent} from "../../../nav/navigation/navigation.component";
import {SignUpComponent} from "../../../auth/signup/_component/sign-up/sign-up.component";
import {DetailsComponent} from "../details/details.component";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  savedState = false;
  productFilterForm: FormGroup;
  productList: Product[];
  serviceResultsLength = 0;
  servicePageSize = 10;
  pageEvent: PageEvent;
  @ViewChild('paginatorService', {static: true}) servicePaginator: MatPaginator;
  @ViewChild('sortService', {static: true}) serviceSort: MatSort;

  serviceDisplayedColumns: string[] = ['info', 'image', 'title', 'current_price', 'stars', 'save'];

  constructor(private fb: FormBuilder,
              private productService: ProductsService,
              private navigationComponent: NavigationComponent,
              public dialog: MatDialog,
              private snack: MatSnackBar) {

  }

  ngOnInit(): void {
    this.navigationComponent.navigationItems[1]['isSelected'] = true;
    this.productFilterForm = this.getFilterForm();
    this.getProducts();
  }


  getProducts(event?: PageEvent) {

    this.productService.getProducts(this.servicePaginator, this.serviceSort, this.productFilterForm, this.savedState).subscribe(
      data => {
        this.productList = data['results'];
        this.serviceResultsLength = data['count'];

      },
      error => {
        this.snack.open(error.error, 'Mbyll', {duration: 3000})
      }
    );
    return event;
  }


  getFilterForm() {
    return this.fb.group({
      name: [null, [Validators.maxLength(150)]],
    })
  }


  searchProducts() {
    this.servicePaginator.pageIndex = 0;
    this.getProducts();
  }


  clearServiceFilters() {
    this.productFilterForm.reset();
    this.searchProducts();
  }


  showInfo(row) {
    const dialogRef = this.dialog.open(DetailsComponent, {
      width: '500px',
      data: row
    });
  }


  saveProduct(row) {
    this.productService.saveProduct(row.id).subscribe(
      data => {
        this.snack.open(data['response'], 'Mbyll', {duration: 3000});
        row.is_saved = !row.is_saved;
      },
      error => {
        this.snack.open(error.error['error'], 'Mbyll', {duration: 3000})
      }
    );

  }

  toggleSaved(ev) {
    this.servicePaginator.pageIndex = 0;
    this.savedState = ev.checked;
    this.getProducts();
  }


}
