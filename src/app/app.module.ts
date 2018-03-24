
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { SafeHttp } from './../utils/safe-http';
import { NetworkService } from './../utils/network-service';
import { Network } from '@ionic-native/network';
import { MyApp } from './app.component';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from "@ionic-native/facebook";
import { OneSignal } from '@ionic-native/onesignal';
import { Badge } from '@ionic-native/badge';

import { LoginProvider } from "../providers/login/login.provider";
import { FshUtils } from '../utils/fsh-util';
import { NotificacaoProvider } from '../providers/notificacao/notificacao.provider';

@NgModule({
  declarations: [
    MyApp, 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoginProvider,
    Network,
    NetworkService,
    SafeHttp,
    Facebook,
    GooglePlus,
    FshUtils,
    OneSignal,
    Badge,
    NotificacaoProvider
  ]
})
export class AppModule {}
