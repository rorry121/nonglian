import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WesayPage } from './wesay';
import {HaveasayPageModule} from "./haveasay/haveasay.module";

@NgModule({
  declarations: [
    WesayPage,
  ],
  imports: [
    IonicPageModule.forChild(WesayPage),
    HaveasayPageModule
  ],
})
export class WesayPageModule {}
