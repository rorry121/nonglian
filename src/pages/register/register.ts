import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpProvider} from "../../providers/http/http";
import {CommonProvider} from "../../providers/common/common";
import {MinePage} from "../mine/mine";
import {StorageProvider} from "../../providers/storage/storage";
import {JpushProvider} from "../../providers/jpush/jpush";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  aaa:boolean = false;
  text1:string = "text";
  password1:string = "password";
  eye1:string = "eye";
  eyeoff1:string = "eye-off";
  model=new UserModel('','','');
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public httpProvider:HttpProvider,
              public commonProvider:CommonProvider,
              public storageProvider:StorageProvider,
              public jpushProvider: JpushProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  onSubmit(r) {
    console.log(r);

    this.httpProvider.signup(r.value).subscribe(
      data=>{console.log(data);this.commonProvider.showToast('注册成功，请留意邮件，尽快验证账户','bottom',3000);this.backtoMypage()},err=>{
        this.commonProvider.showToast(err,'bottom',3000);
      }
    );
  }
  view1() {
    this.aaa = !this.aaa;
  }
  backtoMypage() {
    let f={
      username:this.model.username,
      password:this.model.password
    }
    this.httpProvider.login(f).subscribe(data=>{
      this.storageProvider.write('session_token', data.sessionToken);
      this.storageProvider.write('userInfo', data);
      this.jpushProvider.jPushSet();
      let userid=data.objectId;
      this.jpushProvider.changeAlias(userid);
      this.navCtrl.setRoot(MinePage,data)
    },err=>{
      this.commonProvider.showToast(err,'bottom',3000);
    })

  }
  backto(){
    this.navCtrl.pop();
  }
}
export class UserModel{
  constructor(
  public username:string,
  public email:string,
  public password:string){}
}
