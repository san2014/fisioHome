import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExternUserRegisterPage } from './extern-user-register';

import { UserProvider } from '../../providers/user/user.provider';
import { CepProvider } from '../../providers/cep/cep.provider';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ExternUserRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(ExternUserRegisterPage),
    SharedModule
  ],
  providers:[
    UserProvider,
    CepProvider
  ]  
})
export class ExternUserRegisterPageModule {}
