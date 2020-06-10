import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { SMC_APIS, GlobalService } from '../common';
import { map } from 'rxjs/operators';
import { Sector } from '../interface/sector';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  constructor(
    private _httpClient: HttpClient,
    private _globalService: GlobalService
  ) { }

  public fetchAllSectors(): Observable<any>{
    if(this._globalService.sectors && this._globalService.sectors.length>0){
      return of(this._globalService.sectors);
    }else{
      return this._httpClient.get(SMC_APIS.sector).pipe(map((data: Sector[])=>{
        this._globalService.sectors = data;
        return data;
      }));
    }
  }
}
