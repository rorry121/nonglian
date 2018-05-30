import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WesayPage } from './wesay';
import {HaveasayPageModule} from "./haveasay/haveasay.module";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    WesayPage,
  ],
  imports: [
    IonicPageModule.forChild(WesayPage),
    HaveasayPageModule,
    ComponentsModule
  ],
})
export class WesayPageModule {}
