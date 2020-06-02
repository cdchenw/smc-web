import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';

import { environment } from '../../environments/environment';
import { Broadcaster } from './broadcaster';
import { SMC_APIS } from './api.config';
import { SMC_CONSTANTS } from './constant';

const HTTP_TIMEOUT = 30000; // 3s

@Injectable()
export class SmcHttpInterceptor implements HttpInterceptor {

  constructor(
    private _router: Router,
    private _broadcaster: Broadcaster
  ) { }

  //override the interface method, to catch http requst and response
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let self = this;
    const interceptObservable: Subject<HttpEvent<any>> = new Subject();
    const modifiedRequest = this.normalizeRequestHeaders(request);
    next.handle(modifiedRequest)
      .subscribe((event) => {
        self.handleSuccessResponse(event, interceptObservable);
      }, (error) => {
        return self.handleErrorResponse(error, interceptObservable);
      });
    return interceptObservable;
  }

  //construct the http requst with new header 
  protected normalizeRequestHeaders(request: HttpRequest<any>): HttpRequest<any> {
    let modifiedHeaders = new HttpHeaders();
    modifiedHeaders = modifiedHeaders.set('Content-Type', 'application/json');
    if (request.url.indexOf(SMC_APIS.authenticate) == -1) {
      modifiedHeaders = this.addAuthorizationHeaders(modifiedHeaders);
    }
    return request.clone({
      url: environment.BASE_URL + request.url,//添加域名前缀
      withCredentials: true,//跨域支持
      headers: modifiedHeaders
    });
  }

  //add authorization token to http requst header
  protected addAuthorizationHeaders(headers: HttpHeaders): HttpHeaders {
    let accessToken = localStorage.getItem(SMC_CONSTANTS.API_TOKEN);
    if (!accessToken) {
      throw "Authorization required!";
    }
    headers = headers.set('Authorization', accessToken);
    return headers;
  }

  protected handleSuccessResponse(event: HttpEvent<any>, interceptObservable: Subject<HttpEvent<any>>): void {
    if (event instanceof HttpResponse) {
      interceptObservable.next(event);
      interceptObservable.complete();
    }
  }

  protected handleErrorResponse(error: any, interceptObservable: Subject<HttpEvent<any>>): Observable<any> {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        localStorage.removeItem(SMC_CONSTANTS.API_TOKEN);
      }
    }
    interceptObservable.error(error);
    interceptObservable.complete();
    return of({});
  }
}
