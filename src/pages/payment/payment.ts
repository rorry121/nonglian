import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  payWechat:boolean=true;
  payAlipay:boolean=false;
  totalMoney:number=0;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController
  ) {
    this.totalMoney=this.navParams.get('totalMoney');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentPage');
  }
  chose(op){
    if(op){
      if(this.payWechat){
        this.payAlipay=false;
      }
    }else{
      if(this.payAlipay){
        this.payWechat=false;
      }
    }
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
