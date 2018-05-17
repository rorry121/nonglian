import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the AddCartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-cart',
  templateUrl: 'add-cart.html',
})
export class AddCartPage {
  imgUrl:string='';
  price:number=0;
  buyNum:number=1;
  danwei:string='';
  callback: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
    this.callback = this.navParams.get("cb");
    this.imgUrl= this.navParams.get('imgUrl');
    this.danwei=this.navParams.get('danwei');
    console.log(this.danwei);
    this.price=this.navParams.get('price');
  }
  changeBuyNum(add){
    if(add){
      this.buyNum++;
    }else{
      if(this.buyNum>1){
        this.buyNum--;
      }
    }

}
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCartPage');
  }
  close() {
    this.viewCtrl.dismiss();
  }
  selectWay(num,buyNum){
    this.viewCtrl.dismiss();
    setTimeout(()=>{
      this.callback(num,this.buyNum);
    },300)
  }

}
