import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MinePage } from './mine';
import {OrderPage} from "./order/order";
import {StarListPage} from "./startlist/starlist";
import {EyeListPage} from "./eyelist/eyelist";
import {LikeListPage} from "./likelist/likelist";
import {AfterSalePage} from "./aftersale/aftersale";
import {NeedEstimatePage} from "./needestimate/needestimate";
import {WaitGetPage} from "./waitget/waitget";
import {WaitSendPage} from "./waitsend/waitsend";
import {NeedPayPage} from "./needpay/needpay";
import {SetPage} from "./set/set";
import {FocusePage} from "./focuse/focuse";
import {ShoppingCartPage} from "./shoppingcart/shoppingcart";
import {WaitforgoodscommentPageModule} from "./waitforgoodscomment/waitforgoodscomment.module";
import {WaitforgoodscommentPage} from "./waitforgoodscomment/waitforgoodscomment";
import {UserCenterPage} from "./user-center/user-center";
import {ComponentsModule} from "../../components/components.module";

import {ImgSlidesPage} from "../img-slides/img-slides";
import {ModifyPwdPage} from "./user-center/modify-pwd/modify-pwd";
import {ModifyAddressPage} from "./user-center/modify-address/modify-address";
import {AddressListPage} from "./user-center/address-list/address-list";
import {AddressListPageModule} from "./user-center/address-list/address-list.module";
import {ModifyAddressPageModule} from "./user-center/modify-address/modify-address.module";
import {ModifyPwdPageModule} from "./user-center/modify-pwd/modify-pwd.module";

@NgModule({
  declarations: [
    MinePage,
    OrderPage,
    ShoppingCartPage,
    FocusePage,
    SetPage,
    NeedPayPage,
    WaitSendPage,
    WaitGetPage,
    NeedEstimatePage,
    AfterSalePage,
    LikeListPage,
    EyeListPage,
    StarListPage,
    UserCenterPage,
    // ModifyPwdPage,
    // ModifyAddressPage,
    // AddressListPage

  ],
  imports: [
    IonicPageModule.forChild(MinePage),
    WaitforgoodscommentPageModule,
    ComponentsModule,
    AddressListPageModule,
    ModifyAddressPageModule,
    ModifyPwdPageModule

  ],
  entryComponents:[
    LikeListPage,
    WaitforgoodscommentPage,
    UserCenterPage,
    ShoppingCartPage,
    ModifyPwdPage,
    ModifyAddressPage,
    AddressListPage
  ]
})
export class MinePageModule {}
