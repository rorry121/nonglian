import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {StorageProvider} from "../../../../providers/storage/storage";
import {HttpProvider} from "../../../../providers/http/http";
import {CommonProvider} from "../../../../providers/common/common";

/**
 * Generated class for the ModifyPwdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modify-pwd',
  templateUrl: 'modify-pwd.html',
})
export class ModifyPwdPage {
  email:string;
  localEmail:string;
  user:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storageProvider:StorageProvider,
              public httpProvider:HttpProvider,
              public commonProvider:CommonProvider
  ) {
    this.user=this.storageProvider.read('userInfo');
    this.localEmail=this.user.email;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifyPwdPage');
  }
  sendEmail(){
    this.httpProvider.post('requestPasswordReset',{email:this.email}).subscribe(data=>{
      console.log(data);
      this.commonProvider.showToast('邮件已发送，请注意查收','top',1500);
      this.email="";
    },err=>{
      this.commonProvider.showToast(err,'top',1500);
      this.email="";
    })
  }
}
