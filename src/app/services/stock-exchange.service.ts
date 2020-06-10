import { Injectable } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap, map } from 'rxjs/operators';

import { StockExchange } from '../interface/stock-exchange';
// import { STOCKEXCHANGES } from '../mock-data/stock-exchange-mock';
import { HttpClient } from '@angular/common/http';
import { SMC_APIS } from '../common';

interface SearchResult {
  exchangeList: StockExchange[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
}

@Injectable({
  providedIn: 'root'
})
export class StockExchangeService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _exchangeList$ = new BehaviorSubject<StockExchange[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 15
  };

  constructor(
    private _httpClient: HttpClient,
    private pipe: DecimalPipe) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._exchangeList$.next(result.exchangeList);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get exchangeList$() { return this._exchangeList$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {pageSize, page} = this._state;

    return this._httpClient.get<any>(SMC_APIS.stockExchange).pipe(
      map(data=>{
        // 1. get from host
        let exchangeList = data;

        // 2. sort by stock code
        exchangeList.sort();
        const total = exchangeList.length;

        // 3. paginate
        exchangeList = exchangeList.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return {exchangeList, total};
      })
    );
  }

  public fetch(): void{
    this._search$.next();
  }

  public addNew(stockExchange: StockExchange): Observable<any>{
    return this._httpClient.post(SMC_APIS.stockExchange, JSON.stringify(stockExchange));
  }

  public update(stockExchange: StockExchange): Observable<any>{
    return this._httpClient.put(SMC_APIS.stockExchange, JSON.stringify(stockExchange));
  }

  public delete(id: string): Observable<any>{
    return this._httpClient.delete(SMC_APIS.stockExchange+"/"+id);
  }
}
