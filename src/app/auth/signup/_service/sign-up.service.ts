import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  private readonly CREATE_ENDPOINT = `${environment.API_ENDPOINT}create-user/`;

  constructor(private http: HttpClient) { }

  createUser(userData): Observable<any>{
    return this.http.post(`${this.CREATE_ENDPOINT}`, userData);
  }


}
