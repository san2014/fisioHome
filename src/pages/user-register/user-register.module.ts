import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserRegister } from './user-register';
import { SharedModule } from './../../modules/shared.module';
import { UserProvider } from './../../providers/user/user.provider';
import { FshUtils } from '../../utils/fsh-util';

@NgModule({
  declarations: [
    UserRegister
  ],
  imports: [
    IonicPageModule.forChild(UserRegister),
    SharedModule
  ],
  providers: [UserProvider, FshUtils]
})
export class UserRegisterModule {}
