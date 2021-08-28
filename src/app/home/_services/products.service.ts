import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Observable} from "rxjs";
import {Product} from "../../entities/Product";
import {GlobalService} from "../../common/_services/global.service";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  protected readonly SAVE_URL = `${environment.API_ENDPOINT}save-product/`

  constructor(protected http: HttpClient, protected globalService: GlobalService) { }

  getProducts(page: MatPaginator, sort: MatSort, filter: any, isSavedSate): Observable<Product[]> {
    let ENDPOINT_URL = 'get-products/ours/';
    if(isSavedSate){
      ENDPOINT_URL = 'get-products/ours/saved/';
    }
    return this.globalService.getObjects(page, sort, filter, ENDPOINT_URL);
  }


  saveProduct(id): Observable<any>{
    return this.http.post(this.SAVE_URL, {'product_id': id});
  }

}
