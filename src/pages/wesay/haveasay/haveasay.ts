import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NativeProvider} from "../../../providers/native/native";
import {HttpProvider} from "../../../providers/http/http";
import {StorageProvider} from "../../../providers/storage/storage";
import {WesayPage} from "../wesay";
import {CommonProvider} from "../../../providers/common/common";

/**
 * Generated class for the HaveasayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var AMap;
@IonicPage()
@Component({
  selector: 'page-haveasay',
  templateUrl: 'haveasay.html',
})
export class HaveasayPage {
  locationAttr:any={};
  address:any={};
  lnglatXY=[106.57728, 29.494665];
  imageBase64:string='';
  userobjectId: string;
  user:any;
  res: any;
  res1: string;
  res2: any;
  objpicname: string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public nativeProvider:NativeProvider,
              public httpProvider:HttpProvider,
              public storageProvider:StorageProvider,
              public commonProvider:CommonProvider
  ) {
    let user = storageProvider.read('userInfo');
    console.log(user);
    if(user){
      this.user = user;
      this.userobjectId=this.user.objectId;
    }else{
      // this.commonProvider.showToast('亲，你还未登录哦');
      // this.navCtrl.setRoot(MinePage);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HaveasayPage');
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
      // this.isChange = true;
      // this.isimage=false;
      this.imageBase64 = <string>imageBase64;
    }
    onSubmit(f){
      let userId=this.commonProvider.getLocalUserId();
      if(userId){
        this.httpProvider.uploadFile(this.imageBase64,'wesayImage').then(
          data=>{
            console.log("....data:", data);
            this.res1 = data.response;
            console.log("....this.res1:", this.res1);
            this.res2 = JSON.parse(this.res1);
            console.log("....this.res2:", this.res2);
            this.objpicname = this.res2.name;
            this.setpic(f.value.description,f.value.gaming);
          }
        )
      }else{
        this.commonProvider.showToast('亲，只有登录了才可发表哦','bottom',2000);
      }
      // if (this.isChange) {
      //   console.log(this.imageBase64);//这是头像数据.
      //   this.nativeService.showLoading('正在上传....');
      //
      //   // this.viewCtrl.dismiss({avatarPath: this.avatarPath});//这里可以把头像传出去.
      //
      // } else {
      //   // this.dismiss();
      // }
    }
  setpic(description,gaming){
      let loading=this.commonProvider.showLoading();
      this.nativeProvider.getLocation().subscribe(data=>{
        // this.lnglatXY[0]=this.locationAttr.coords.longitude;
        // this.lnglatXY[1]=this.locationAttr.coords.latitude;
        let geoPoint:any={
          "__type": "GeoPoint",
          "latitude": data.lat,
          "longitude": data.lng
        }
        let address=this.getAddress(this.lnglatXY);
        this.httpProvider.havewesay(this.userobjectId,this.objpicname,gaming,description,geoPoint,address).subscribe(data=>{
          console.log(data);
          console.log(this.userobjectId);console.log(this.objpicname);
          this.gotoWesay(gaming);
          loading.dismiss();
          // data => this.navCtrl.push(AboutPage)
        },err=>{
          loading.dismiss();
          this.commonProvider.showToast(err,'bottom',3000)
        });
      })
  }
  getAddress(lnglatXY){
    let lnglat=lnglatXY;
    let geocoder = new AMap.Geocoder({
      radius: 1000,
      extensions: "all"
    });
    geocoder.getAddress(lnglat,(status, result)=>{
      if (status === 'complete' && result.info === 'OK') {
        console.log(result);
        let address = result.regeocode.formattedAddress; //返回地址描述
        return address;
      }else{
        return '';
      }
    });
  }
  gotoWesay(gaming){
    this.navCtrl.setRoot(WesayPage,{gaming:gaming});
  }
}
