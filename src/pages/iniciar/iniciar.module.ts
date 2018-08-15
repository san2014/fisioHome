import { NgModule } from '@angular/core';

import { Badge } from '@ionic-native/badge';

import { IonicPageModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { SharedModule } from './../../shared/shared.module';

import { IniciarPage } from './iniciar';

import { TipoAtendimentoProvider } from '../../providers/tipo-atendimento/tipo-atendimento.provider';

@NgModule({
  declarations: [
    IniciarPage,
  ],
  imports: [
    IonicPageModule.forChild(IniciarPage),
    ComponentsModule,
    SharedModule
  ],
  providers:[
    TipoAtendimentoProvider,
    Badge
  ]
})
export class IniciarPageModule {}
