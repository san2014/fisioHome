import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from "@angular/common/http";
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

    private loginProvider: LoginProvider;

    constructor(private injector: Injector) {}

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpSentEvent | HttpHeaderResponse |
        HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>>{
        this.loginProvider = this.injector.get(LoginProvider);
        
            if (this.loginProvider.usuarioLogado == undefined){
                return next.handle(req);
            }
       
           return next.handle(
            req.clone({
                setHeaders:
                    { Authorization: 'Bearer ' + this.loginProvider.getAccessToken() }
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

    getAccessToken(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return this.loginProvider.refreshToken(this.loginProvider.getRefreshToken()).switchMap(
            resp => {
                this.loginProvider.setAccessToken(resp.access_token)
                return next.handle(req.clone({
                    setHeaders:
                        { Authorization: 'Bearer ' + this.loginProvider.getAccessToken() }
                }));
            }
        )
    }

}