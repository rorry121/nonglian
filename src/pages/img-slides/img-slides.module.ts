import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImgSlidesPage } from './img-slides';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    ImgSlidesPage,
  ],
  imports: [
    IonicPageModule.forChild(ImgSlidesPage),
    ComponentsModule
  ],
})
export class ImgSlidesPageModule {}
