import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpProvider} from "../../providers/http/http";
import {StorageProvider} from "../../providers/storage/storage";
import {RegisterPage} from "../register/register";
import {CommonProvider} from "../../providers/common/common";
import {Md5} from "ts-md5/dist/md5";


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  formModule: FormGroup =new FormGroup({
    data: new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    })
  });

  userinfo: any;
  user: any;
  aaa:boolean = false;
  text1:string = "text";
  password1:string = "password";
  eye1:string = "eye";
  eyeoff1:string = "eye-off";
  open2:boolean = false;
  username:string='';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public httpProvider:HttpProvider,
              public storageProvider:StorageProvider,
              public commonProvider:CommonProvider
  ) {

  }

  ionViewDidLoad() {
    this.user = this.storageProvider.read('userInfo');
    if(this.user){
      this.username=this.user.username;
    }
  }
  onSubmit() {
    console.log(this.formModule.value.data);
    let body={
      username:this.formModule.value.data.username,
      password:Md5.hashStr(this.formModule.value.data.password)
    }
    this.httpProvider.login(body).subscribe(data=>{
      // this.storeToken(data.json());this.userinfo=data.json();this.backto();
      this.storageProvider.write('userInfo', data);
      this.backto();
      console.log(data);
    },err=>{
      this.commonProvider.showToast(err,'bottom',3000);
    });
  }
  forgetPassword() {
    // this.navCtrl.push(ForgetPassword);
  }

  view1() {
    this.aaa = !this.aaa;
  }
  // backtoMypage(userinfo) {
  //   this.navCtrl.setRoot(MinePage,userinfo);
  // }
  backto() {
    this.navCtrl.pop();
  }
  gotoRegister() {
    this.navCtrl.push(RegisterPage);
  }
  open1() {
    this.open2 = !this.open2;
  }
}
