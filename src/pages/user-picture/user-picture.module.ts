import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserPicturePage } from './user-picture';
import { Camera } from '@ionic-native/camera';
import {File} from "@ionic-native/file";

@NgModule({
  declarations: [
    UserPicturePage,
  ],
  imports: [
    IonicPageModule.forChild(UserPicturePage),
  ],
  providers: [
    Camera,
    File
  ]
})
export class UserPicturePageModule {}
