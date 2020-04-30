import { Injectable } from '@angular/core';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private _currUser: User;
  private _isAdmin: boolean;//admin; user;
  
  constructor() { }

  public get currUser(): User {
    this._currUser = {
      email: 'chen1059@qq.com',
      name: 'Vince God',
      mobile: '17300001111'
    } as User;
    return this._currUser;
  }
  public set currUser(value: User) {
    this._currUser = value;
  }
  public get isAdmin(): boolean {
    this._isAdmin = true;
    return this._isAdmin;
  }
  public set isAdmin(value: boolean) {
    this._isAdmin = value;
  }
}
