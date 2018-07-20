import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfRegisterPage } from './prof-register';

import { TipoAtendimentoProvider } from '../../providers/tipo-atendimento/tipo-atendimento.provider';

@NgModule({
  declarations: [
    ProfRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfRegisterPage),
  ],
  providers: [
    TipoAtendimentoProvider
  ]
})
export class ProfRegisterPageModule {}
