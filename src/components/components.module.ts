import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InitProfComponent } from './init-prof/init-prof';
import { InitCliComponent } from './init-cli/init-cli';

@NgModule({
	declarations: [InitProfComponent,
    InitCliComponent],
	imports: [IonicPageModule],
	exports: [InitProfComponent,
    InitCliComponent]
})
export class ComponentsModule {}
