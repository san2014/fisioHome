import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PropostaSendPage } from './proposta-send';
import { SharedModule } from '../../shared/shared.module';

import { LoadingService } from '../../utils/loading.service';

@NgModule({
  declarations: [
    PropostaSendPage,
  ],
  imports: [
    IonicPageModule.forChild(PropostaSendPage),
    SharedModule
  ],
  providers: [
    LoadingService
  ]
})
export class PropostaSendPageModule {}
