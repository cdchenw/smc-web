import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Params, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { GlobalService } from './global.service';
import { SMC_CONSTANTS } from './constant';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _globals: GlobalService
  ) { }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>{
    return this.checkLogin(state.url, next.params);
  }

  checkLogin(url: string, queryParams: Params): Observable<boolean> {
    if(this.isLoggedIn()){
      return of(true);
    }
    this._router.navigate(['/login']);
    return of(false);
  }

  private isLoggedIn(): boolean{
    return localStorage.getItem(SMC_CONSTANTS.API_TOKEN) && !!this._globals.currentUser;
  }

}
