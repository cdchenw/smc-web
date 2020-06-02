import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { Role } from '../interface/Role';
import { SMC_CONSTANTS } from './constant';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private _currentUser: User;
  private _currentRole: Role;

  constructor() { }

  public get currentUser(): User {
    return this._currentUser;
  }
  public set currentUser(value: User) {
    this._currentUser = value;
  }
  public get currentRole(): Role {
    return this._currentRole;
  }
  public set currentRole(value: Role) {
    this._currentRole = value;
  }
  public get isAdmin(): boolean {
    return this._currentRole && this.currentRole.name==SMC_CONSTANTS.ROLE.ADMIN;
  }

}
