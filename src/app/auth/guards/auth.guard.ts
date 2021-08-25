import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route, Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../_services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {



  constructor(private authService: AuthService, private router: Router) {
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin();
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin();
  }



  checkLogin(): boolean{
    const isSignedIn = this.authService.checkIfHasToken();
    if(!isSignedIn){
      this.router.navigate(['login']);
    }
    return isSignedIn;
  }


}
