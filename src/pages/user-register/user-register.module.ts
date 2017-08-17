import { UserModule } from './../../modules/user.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserRegister } from './user-register';
import { SharedModule } from './../../modules/shared.module';

@NgModule({
  declarations: [
    UserRegister
  ],
  imports: [
    IonicPageModule.forChild(UserRegister),
    SharedModule
  ],
})
export class UserRegisterModule {}
