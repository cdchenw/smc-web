import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { GlobalService, SMC_CONSTANTS } from '.';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(
    private _globals: GlobalService
  ) { }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.checkUserAuthorization();
  }

  private checkUserAuthorization(): Observable<boolean>{
    if(this._globals.currentRole && this._globals.currentRole.name==SMC_CONSTANTS.ROLE.USER){
      return of(true);
    }
    return of(false);
  }
}
