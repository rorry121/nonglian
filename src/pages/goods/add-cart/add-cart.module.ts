import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCartPage } from './add-cart';

@NgModule({
  declarations: [
    AddCartPage,
  ],
  imports: [
    IonicPageModule.forChild(AddCartPage),
  ],
})
export class AddCartPageModule {}
