import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { Role } from '../interface/Role';
import { SMC_CONSTANTS } from './constant';
import { SectorService } from '../services/sector.service';
import { Sector } from '../interface/sector';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private _currentUser: User;
  private _currentRole: Role;
  private _sectors: Sector[];

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
  public get sectors(): Sector[] {
    return this._sectors;
  }
  public set sectors(value: Sector[]) {
    this._sectors = value;
  }

}
