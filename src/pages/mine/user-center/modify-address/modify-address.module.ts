import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifyAddressPage } from './modify-address';

@NgModule({
  declarations: [
    ModifyAddressPage,
  ],
  imports: [
    IonicPageModule.forChild(ModifyAddressPage),
  ],
})
export class ModifyAddressPageModule {}
