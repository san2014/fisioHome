import { TipoAtendimentoProvider } from '../../providers/tipo-atendimento/tipo-atendimento.provider';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { Badge } from '@ionic-native/badge';

import { ComponentsModule } from '../../components/components.module';
import { IniciarPage } from './iniciar';

@NgModule({
  declarations: [
    IniciarPage,
  ],
  imports: [
    IonicPageModule.forChild(IniciarPage),
    ComponentsModule
  ],
  providers:[
    TipoAtendimentoProvider,
    Badge
  ]
})
export class IniciarPageModule {}
