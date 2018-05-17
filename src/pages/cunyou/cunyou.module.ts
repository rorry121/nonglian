import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CunyouPage } from './cunyou';
import {ComponentsModule} from "../../components/components.module";
import {CunyouFujinPageModule} from "./cunyou-fujin/cunyou-fujin.module";

@NgModule({
  declarations: [
    CunyouPage,
  ],
  imports: [
    IonicPageModule.forChild(CunyouPage),
    ComponentsModule,
  ],
})
export class CunyouPageModule {}
