import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CunyouDetailsPage } from './cunyou-details';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    CunyouDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(CunyouDetailsPage),
    ComponentsModule
  ],
})
export class CunyouDetailsPageModule {}
