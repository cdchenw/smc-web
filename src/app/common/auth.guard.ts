import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Params, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { GlobalService } from './global.service';
import { SMC_CONSTANTS } from './constant';
import { HttpClient } from '@angular/common/http';
import { SMC_APIS } from './api.config';
import { map, catchError } from 'rxjs/operators';
import { User } from '../interface/user';
import { Role } from '../interface/Role';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _router: Router,
    private _httpClient: HttpClient,
    private _globals: GlobalService
  ) { }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>{
    return this.checkLogin(state.url, next.params);
  }

  checkLogin(url: string, queryParams: Params): Observable<boolean> {
    let self = this;
    if(this.isLoggedIn()){
      return of(true);
    }
    if(localStorage.getItem(SMC_CONSTANTS.API_TOKEN) && !this._globals.currentUser){
      localStorage.setItem("PRE_URL", url);
      return this._httpClient.get(SMC_APIS.currentUser)
        .pipe(map((data: any)=>{
          if(data && data.email){
            self._globals.currentUser = data;
            self._globals.currentRole = {name: data.userType} as Role;
            let preUrl = localStorage.getItem("PRE_URL");
            if(preUrl){
              self._router.navigateByUrl(preUrl);
            }
            return true;
          }
          self._router.navigate(['/login']);
          return false;
        }), 
        catchError(err=>{
          self._router.navigate(['/login']);
          return of(false);
        }));
    }else{
      this._router.navigate(['/login']);
      return of(false);
    }
    
  }

  private isLoggedIn(): boolean{
    return localStorage.getItem(SMC_CONSTANTS.API_TOKEN) && !!this._globals.currentUser;
  }

}
