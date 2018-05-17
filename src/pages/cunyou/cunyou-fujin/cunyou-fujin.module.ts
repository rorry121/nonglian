import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CunyouFujinPage } from './cunyou-fujin';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    CunyouFujinPage,
  ],
  imports: [
    IonicPageModule.forChild(CunyouFujinPage),
    ComponentsModule
  ],
})
export class CunyouFujinPageModule {}
