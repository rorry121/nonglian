import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowMapPage } from './show-map';

@NgModule({
  declarations: [
    ShowMapPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowMapPage),
  ],
})
export class ShowMapPageModule {}
