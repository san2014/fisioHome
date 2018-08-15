import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PropostaInitPage } from './proposta-init';

import { PropostaProvider } from '../../providers/proposta/proposta.provider';

import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    PropostaInitPage,
    
  ],
  entryComponents: [],
  imports: [
    IonicPageModule.forChild(PropostaInitPage),
    SharedModule
  ],
  providers:[
    PropostaProvider
  ]
})
export class PropostaInitPageModule {}
