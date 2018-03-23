import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationsViewsPage } from './notifications-views';

@NgModule({
  declarations: [
    NotificationsViewsPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationsViewsPage),
  ],
})
export class NotificationsViewsPageModule {}
