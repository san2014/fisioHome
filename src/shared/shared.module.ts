import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';

import { ToastService } from '../utils/toast.service';
import { AlertService } from '../utils/alert.service';
import { LoadingService } from '../utils/loading.service';

@NgModule({
    imports: [
        IonicModule
    ],
    exports: [],
    declarations: [],
    providers: [
        ToastService,
        AlertService,
        LoadingService
    ],
})
export class SharedModule { }
