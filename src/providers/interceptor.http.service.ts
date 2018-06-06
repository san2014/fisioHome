import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';

import { LoginProvider } from './login/login.provider';

@Injectable()
export class InterceptorHttpService implements HttpInterceptor {

    constructor(
        private loginProvider: LoginProvider
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpSentEvent | HttpHeaderResponse | 
        HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        return next.handle(
            req.clone({
                setHeaders:
                    { Authorization: 'Bearer ' + this.loginProvider.getToken }
            })).catch(error => {
                if (error instanceof HttpErrorResponse) {
                    switch ((<HttpErrorResponse>error).status) {
                        case 401:
                            return this.getAccessToken(req, next);
                        case 0:
                            return this.getAccessToken(req, next);    
                    }
                    Observable.throw(error);
                }else{
                    Observable.throw(error);
                }
            }

            );
    }

    async getAccessToken(req: HttpRequest<any>, next: HttpHandler): Promise<any> {
        return this.loginProvider.getAccessToken(this.loginProvider.refreshToken).switchMap(
            resp => {
                this.loginProvider.accessToken = resp.access_token;
                return next.handle(req.clone({
                    setHeaders:
                        { Authorization: 'Bearer ' + this.loginProvider.accessToken  }
                }));
            }
        )
    }

}