import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from './../../shared/shared.module';
import { UserRegisterModule } from '../user-register/user-register.module';

import { Login } from './login';

@NgModule({
  declarations: [
    Login,
  ],
  imports: [
    IonicPageModule.forChild(Login),
    UserRegisterModule,
    SharedModule
  ],
  providers:[]
})
export class LoginModule {}
