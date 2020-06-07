import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SMC_APIS } from '../common';

@Injectable({
  providedIn: 'root'
})
export class StockPriceService {

  constructor(
    private _httpClient: HttpClient
  ) { }


  public seach(searchConditions: any): Observable<any>{
    let body = JSON.stringify(searchConditions);
    console.log("body>>", body);
    return this._httpClient.post(SMC_APIS.stockPrice, body);
  }
}
