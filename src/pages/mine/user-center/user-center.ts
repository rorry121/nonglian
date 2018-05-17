import { Component } from '@angular/core';
import {AlertController, NavController, Events} from 'ionic-angular';
import {StorageProvider} from "../../../providers/storage/storage";
import {HttpProvider} from "../../../providers/http/http";
import {NativeProvider} from "../../../providers/native/native";
import {LoginPage} from "../../login/login";
import {CommonProvider} from "../../../providers/common/common";
import {ModifyPwdPage} from "./modify-pwd/modify-pwd";
import {AddressListPage} from "./address-list/address-list";

@Component({
  selector: 'user-center',
  templateUrl: 'user-center.html'
})
export class UserCenterPage {
  userInfo:any;
  isChange: boolean = false;//头像是否改变标识
  avatarPath: string = './assets/img/linker.png';//用户默认头像
  imageBase64: string='./assets/img/linker.png';//保存头像base64,用于上传
  res: any;
  res1: string;
  res2: any;
  objpicname:string;
  constructor(
    public navCtrl: NavController,
    public storageProvider: StorageProvider,
    public httpProvider:HttpProvider,
    public alertCtrl:AlertController,
    public nativeProvider:NativeProvider,
    public commonProvider:CommonProvider,

  ) {
    this.userInfo= this.storageProvider.read('userInfo');
  }
  gotologin(){
    this.navCtrl.push(LoginPage);
  }
  changeAvatar() { //更换头像
    if (!this.userInfo) {
      this.gotologin();
    }else{
      this.showAlert();
    }

  }
  showAlert() {
    let alert = this.alertCtrl.create({
      title: '请选择上传方式',
      subTitle: '请自觉遵守互联网相关的政策法规，严禁上传包括 “反动、暴力、色情、违法及侵权内容” 的图片！',
      buttons: [
        {
          text: '从相册选一张',
          handler: data => {
            this.getPicture(0);
          }
        },
        {
          text: '拍一张照片',
          handler: data => {
            this.getPicture(1);
          }
        }
      ]
    });
    alert.present();
  }
  getPicture(type) {//1拍照,0从图库选择
    let options = {
      targetWidth: 540,
      targetHeight: 270
    };
    if (type == 1) {
      this.nativeProvider.getPictureByCamera(options).then(imageBase64 => {
        this.getPictureSuccess(imageBase64);
      });
    } else {
      this.nativeProvider.getPictureByPhotoLibrary(options).then(imageBase64 => {
        this.getPictureSuccess(imageBase64);
      });
    }
  }
  getPictureSuccess(imageBase64) {
    this.isChange = true;
    this.imageBase64 = <string>imageBase64;
    this.avatarPath = 'data:image/jpeg;base64,' + imageBase64;
    if (this.isChange) {
      this.upload();
      // this.nativeService.showLoading('正在上传....');

      // this.viewCtrl.dismiss({avatarPath: this.avatarPath});//这里可以把头像传出去.

    } else {
      // this.dismiss();
    }
  }
  upload(){
    this.httpProvider.uploadFile(this.imageBase64,'touxiangImage').then(
      data=>{
        console.log("....data:",data);
        this.res1=data.response;
        console.log("....this.res1:",this.res1);
        this.res2=JSON.parse(this.res1);
        console.log("....this.res2:",this.res2);
        this.objpicname=this.res2.name;
        this.setpic();
      },err=>{
        this.commonProvider.showToast(err,'bottom',3000)
      }
    )
  }
  setpic(){
    this.httpProvider.setpic(this.userInfo.objectId,this.objpicname,"users","touxiang").subscribe(data=>{
      // console.log(this.objpicname);
      this.httpProvider.deletefiles(this.userInfo.touxiang.name).subscribe(data=>{console.log('删除原头像完成！')}
        ,err=>{
          this.commonProvider.showToast(err,'bottom',3000)
        })
      this.reload();
      // data => this.navCtrl.push(AboutPage)
    },err=>{
      this.commonProvider.showToast(err,'bottom',3000)
    });
  }
  reload(){
    this.httpProvider.getuser(this.userInfo.objectId).subscribe(data=>{
      this.storageProvider.write('userInfo',data);
      this.userInfo =this.storageProvider.read('userInfo');
    },err=>{
      this.commonProvider.showToast(err,'bottom',3000)
    });
  }
  goToModifyPwd(){
    this.navCtrl.push(ModifyPwdPage);
  }
  goToAddressList(){
    this.navCtrl.push(AddressListPage);
  }
}
