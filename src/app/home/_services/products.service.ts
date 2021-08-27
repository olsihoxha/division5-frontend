import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Observable} from "rxjs";
import {Product} from "../../entities/Product";
import {GlobalService} from "../../common/_services/global.service";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(protected http: HttpClient, protected globalService: GlobalService) { }

  getProducts(page: MatPaginator, sort: MatSort, filter: any): Observable<Product[]> {
    const ENDPOINT_URL = 'get-products/ours/';
    return this.globalService.getObjects(page, sort, filter, ENDPOINT_URL);
  }

}
