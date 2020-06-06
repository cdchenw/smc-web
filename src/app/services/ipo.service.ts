import { Injectable } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap, map } from 'rxjs/operators';

import { IPO } from '../interface/ipo';
// import { IPO_DATA } from '../mock-data/ipo-mock';
import { SMC_APIS } from '../common';
import { HttpClient } from '@angular/common/http';

interface SearchResult {
  ipoList: IPO[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
}

@Injectable({
  providedIn: 'root'
})
export class IpoService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _ipoList$ = new BehaviorSubject<IPO[]>([]);
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
      this._ipoList$.next(result.ipoList);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get ipoList$() { return this._ipoList$.asObservable(); }
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

    return this._httpClient.get<any>(SMC_APIS.ipo).pipe(
      map(data=>{
        // 1. get from host(TBD)
        let ipoList = data;

        // 2. sort by open date desc
        ipoList.sort();
        const total = ipoList.length;

        // 3. paginate
        ipoList = ipoList.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return {ipoList, total};
      })
    );
    
  }

  public fetch(): void{
    this._search$.next();
  }
}
