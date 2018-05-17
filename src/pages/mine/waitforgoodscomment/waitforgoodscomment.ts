import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpProvider} from "../../../providers/http/http";
import {CommonProvider} from "../../../providers/common/common";

/**
 * Generated class for the WaitforgoodscommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-waitforgoodscomment',
  templateUrl: 'waitforgoodscomment.html',
})
export class WaitforgoodscommentPage {
  Goodslist=[];
  userId:string='';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public httpProvider: HttpProvider,
              public commonProvider:CommonProvider
  ) {
    this.userId=this.navParams.data.userId
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WaitforgoodscommentPage');
    this.loadList(this.userId);
  }
  loadList(userId){
    let loading=this.commonProvider.showLoading('正在获取');
    let url='classes/WaitForGoodsComment/'+'?where={"user":{"__type":"Pointer","className":"_User","objectId":"'+userId+'"}}&include=goods&include=user'
    this.httpProvider.get(url).subscribe(data=>{
      this.Goodslist=data.results;
      loading.dismiss();
      console.log(this.Goodslist)
    },err=>{
      loading.dismiss();
      this.commonProvider.showToast(err,'bottom',3000)
    })
  }
}
