import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';

import { ToastService } from '../utils/toast.service';
import { AlertService } from '../utils/alert.service';

@NgModule({
    imports: [
        IonicModule
    ],
    exports: [],
    declarations: [],
    providers: [
        ToastService,
        AlertService
    ],
})
export class SharedModule { }
