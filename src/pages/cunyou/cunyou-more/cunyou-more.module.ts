import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CunyouMorePage } from './cunyou-more';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    CunyouMorePage,
  ],
  imports: [
    IonicPageModule.forChild(CunyouMorePage),
    ComponentsModule
  ],
})
export class CunyouMorePageModule {}
