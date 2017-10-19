import { SobrePageModule } from './../pages/sobre/sobre.module';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { SafeHttp } from './app.safe-http';
import { NetworkService } from './app.network-service';
import { Network } from '@ionic-native/network';
import { MyApp } from './app.component';

import { UserPicturePageModule } from './../pages/user-picture/user-picture.module';
import { UserRegisterModule } from './../pages/user-register/user-register.module';
import { PropostaSendPageModule } from './../pages/proposta-send/proposta-send.module';
import { PropostaInitPageModule } from './../pages/proposta-init/proposta-init.module';
import { ProfRegisterPageModule } from './../pages/prof-register/prof-register.module';
import { ProfInfoRegisterPageModule } from './../pages/prof-info-register/prof-info-register.module';
import { LoginModule } from './../pages/login/login.module';
import { IniciarPageModule } from './../pages/iniciar/iniciar.module';
import { HomePageModule } from './../pages/home/home.module';
import { HometabPageModule } from './../pages/hometab/hometab.module';

import { LoginProvider } from "../providers/login/login.provider";

@NgModule({
  declarations: [
    MyApp, 
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HomePageModule,
    HometabPageModule,
    IniciarPageModule,
    LoginModule,
    ProfInfoRegisterPageModule,
    ProfRegisterPageModule,
    PropostaInitPageModule,
    PropostaSendPageModule,
    UserRegisterModule,
    UserPicturePageModule,
    SobrePageModule
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
    SafeHttp
  ]
})
export class AppModule {}
