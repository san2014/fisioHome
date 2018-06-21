import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';

import { LoginProvider } from './login/login.provider';
import { Events, App } from "ionic-angular";

@Injectable()
export class InterceptorHttpService implements HttpInterceptor {

    private loginProvider: LoginProvider;
    
    constructor(
        private injector: Injector,
        public appCtrl: App
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): 
        Observable<HttpSentEvent | HttpHeaderResponse |
        HttpProgressEvent| HttpResponse<any> | HttpUserEvent<any>>{

        this.loginProvider = this.injector.get(LoginProvider);

        let token = this.loginProvider.getAccessToken();

        if (token == undefined){
            return next.handle(req);
        }
        
        return next.handle(
            req.clone({
                setHeaders:
                    { Authorization: 'Bearer ' + token }
            }))
            .catch(error => {
                
                if (error instanceof HttpErrorResponse) {
                    switch ((<HttpErrorResponse>error).status) {
                        case 400:
                            console.log('token ja invalido');
                            this.appCtrl.getRootNavs()[0].setRoot('Login');
                            return next.handle(req);                        
                        case 401:
                            return this.getAccessToken(req, next);
                        case 0:
                            return this.getAccessToken(req, next);    
                    }
                    Observable.throw(error);
                }else{
                    Observable.throw(error);
                }
            });   
    }

    getAccessToken(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        
        return this.loginProvider.refreshToken(this.loginProvider.getAccessToken()).switchMap(
            resp => {
                this.loginProvider.setAccessToken(resp.token);
                console.log(this.loginProvider.getAccessToken());
                return next.handle(req.clone({
                    setHeaders:
                        { Authorization: 'Bearer ' + this.loginProvider.getAccessToken() }
                }));
            }
        )/*.catch( err => this.loginProvider.clearCookie() )*/
    }

}