import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthService} from "../_services/auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const {access} = this.authService.getCurrentTokenValue();
    if (access) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${access}`
        }
      });
    }
    return next.handle(request);
  }
}

