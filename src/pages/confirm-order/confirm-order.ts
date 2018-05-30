import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {CommonProvider} from "../../providers/common/common";
import {PaymentPage} from "../payment/payment";

/**
 * Generated class for the ConfirmOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirm-order',
  templateUrl: 'confirm-order.html',
})
export class ConfirmOrderPage {
  totalMoney:number=0;
  totalNum:number=0;
  cartGoods:any=[];
  userobjectId:string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public commonProvider:CommonProvider,
              public popoverCtrl: PopoverController,

  ) {
    this.totalMoney = this.navParams.get('totalMoney');
    this.totalNum = this.navParams.get('totalNum');
    this.cartGoods = this.navParams.get('cartGoods');
  }

  ionViewDidLoad() {
  }
  presentPopover(myEvent) {
    this.userobjectId=this.commonProvider.getLocalUserId();
    if(this.userobjectId) {
      let popover = this.popoverCtrl.create(PaymentPage,{
        cb: (password) => {

        },
        totalMoney:this.totalMoney
      });
      popover.present({
        ev: myEvent
      });
    }else
    {
    }
  }
}
