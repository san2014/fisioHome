import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IniciarPage } from './iniciar';

@NgModule({
  declarations: [
    IniciarPage,
  ],
  imports: [
    IonicPageModule.forChild(IniciarPage),
  ],
})
export class IniciarPageModule {}
