import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PropostaInitPage } from './proposta-init';

import { PropostaProvider } from './../../providers/proposta/proposta.provider';

@NgModule({
  declarations: [
    PropostaInitPage,
    
  ],
  entryComponents: [],
  imports: [
    IonicPageModule.forChild(PropostaInitPage)
  ],
  providers:[
    PropostaProvider
  ]
})
export class PropostaInitPageModule {}
