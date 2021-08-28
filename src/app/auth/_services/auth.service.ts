import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpBackend, HttpClient, HttpHeaders} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {AUTH_ENDPOINTS, Token} from "../../division5/endpoints";


export const CURRENT_USERNAME = 'username';
export const CURRENT_EMAIL = 'email';
export const  USER_ID = 'user_id';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private readonly REFRESH_TOKEN = 'refresh';
  private readonly ACCESS_TOKEN = 'access';
  private currentTokenSubject: BehaviorSubject<Token>;
  headerOptions = {};

  private currentToken: Observable<Token>;
  private httpWithoutInterceptor;
  today: Date = new Date();

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private httpBackEnd: HttpBackend,
    private cookieService: CookieService,
    @Inject(LOCALE_ID) public locale: string
  ) {
    const access = this.cookieService.get(this.ACCESS_TOKEN);
    const refresh = this.cookieService.get(this.REFRESH_TOKEN);


    this.currentTokenSubject = new BehaviorSubject<Token>({access, refresh});
    this.currentToken = this.currentTokenSubject.asObservable();
    this.httpWithoutInterceptor = new HttpClient(httpBackEnd);

    this.headerOptions = {
      headers: new HttpHeaders({
        'Accept-Language': this.locale || 'en'
      })
    }
  }

  public login(email: string, password: string) {
    return this.http.post<Token>(AUTH_ENDPOINTS.LOGIN_URL, {email, password}).pipe(
      map(token => {
        if (token) {
          this.setTokenToCookies(token);
          this.currentTokenSubject.next(token);
        }
      })
    );
  }


  setTokenToCookies(token: Token) {
    const nextYear = new Date();
    nextYear.setFullYear(this.today.getFullYear() + 1);
    this.cookieService.set(this.ACCESS_TOKEN, token.access, nextYear, '/', '', false, 'Strict');
    this.cookieService.set(this.REFRESH_TOKEN, token.refresh, nextYear, '/', '', false, 'Strict');
  }



  checkIfHasToken(){
    return this.cookieService.get(this.ACCESS_TOKEN) !== "";
  }

  public logout() {
    this.cookieService.deleteAll('/');
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      throw error;
    };
  }

  public getCurrentTokenValue(): any {
    return this.cookieService.getAll();
  }




}
