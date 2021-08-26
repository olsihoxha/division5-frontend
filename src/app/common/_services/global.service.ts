import {Injectable} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(protected http: HttpClient,) {
  }


  getObjects<T>(paginator: MatPaginator, sort: MatSort, filter: any, path: string): Observable<any> {
    console.log(environment.API_ENDPOINT + path + buildQueryString(paginator, sort, filter));
    return this.http.get<any>(environment.API_ENDPOINT + path + buildQueryString(paginator, sort, filter))
  }


}

function buildQueryString(paginator: MatPaginator, sort: MatSort, filter: FormGroup) {
  const queryString = [];
  const page_size: number = paginator.pageSize ? paginator.pageSize : 10;
  let page: number = paginator.pageIndex ? paginator.pageIndex : 0;
  page++;
  if (page) {
    queryString.push(`page=${page}`);
  }
  if (page_size) {
    queryString.push(`page_size=${page_size}`);
  }

  if (filter.valid && filter.value['name'] !== null) {
      queryString.push(`query=${filter.value['name']}`);
  }

  if (queryString.length > 0) {
    return '?' + queryString.join('&');
  }

  return '';

}


