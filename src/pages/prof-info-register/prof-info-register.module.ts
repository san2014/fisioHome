import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfInfoRegisterPage } from './prof-info-register';

@NgModule({
  declarations: [
    ProfInfoRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfInfoRegisterPage),
  ],
})
export class ProfInfoRegisterPageModule {}
