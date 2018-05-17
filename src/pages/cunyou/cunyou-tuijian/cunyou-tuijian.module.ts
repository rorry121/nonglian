import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CunyouTuijianPage } from './cunyou-tuijian';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    CunyouTuijianPage,
  ],
  imports: [
    IonicPageModule.forChild(CunyouTuijianPage),
    ComponentsModule
  ],
})
export class CunyouTuijianPageModule {}
