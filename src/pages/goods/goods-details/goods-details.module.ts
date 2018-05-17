import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoodsDetailsPage } from './goods-details';

@NgModule({
  declarations: [
    GoodsDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(GoodsDetailsPage),
  ],
})
export class GoodsDetailsPageModule {}
