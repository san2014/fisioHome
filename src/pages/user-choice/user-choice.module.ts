import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserChoicePage } from './user-choice';

@NgModule({
  declarations: [
    UserChoicePage,
  ],
  imports: [
    IonicPageModule.forChild(UserChoicePage),
  ],
})
export class UserChoicePageModule {}
