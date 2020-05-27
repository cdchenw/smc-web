import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interface/user';
import { Observable } from 'rxjs/internal/Observable';
import { SMC_APIS } from '../common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpClient: HttpClient) { }

  login(user: User): Observable<any>{
    return this._httpClient.post<any>(SMC_APIS.authenticate, JSON.stringify(user));
  }

  logout(): Observable<any>{
    return this._httpClient.post<any>(SMC_APIS.logout, {});
  }
}
