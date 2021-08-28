import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  private readonly CREATE_ENDPOINT = `${environment.API_ENDPOINT}get-my-data/`;
  private readonly UPDATE_ENDPOINT = `${environment.API_ENDPOINT}update-my-data/`;
  constructor(private http:HttpClient) { }


  getMyData(): Observable<any>{
    return this.http.get(this.CREATE_ENDPOINT);
  }

  updateMyData(data): Observable<any>{
    return this.http.post(this.UPDATE_ENDPOINT, data);
  }


}
