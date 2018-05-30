import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {NativeProvider} from "../../../providers/native/native";
import {HttpProvider} from "../../../providers/http/http";
import {StorageProvider} from "../../../providers/storage/storage";
import {WesayPage} from "../wesay";
import {CommonProvider} from "../../../providers/common/common";
import {ImagePicker} from "@ionic-native/image-picker";

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
  imageBase64:string='';
  userobjectId: string;
  user:any;
  res: any;
  res1: string;
  res2: any;
  objpicname: string;
  imgArray=[];
  localImg=[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public nativeProvider:NativeProvider,
              public httpProvider:HttpProvider,
              public storageProvider:StorageProvider,
              public commonProvider:CommonProvider,
              private imagePicker: ImagePicker,
              private loadingCtrl: LoadingController,
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
      };
      if (type == 1) {
        this.nativeProvider.getPictureByCamera(options).then(imageBase64 => {
          this.getPictureSuccess(imageBase64);
        });
      } else {
        // this.nativeProvider.getPictureByPhotoLibrary(options).then(imageBase64 => {
        //   this.getPictureSuccess(imageBase64);
        // });
        let imgArray1=[];
        this.imagePicker.getPictures({}).then((results) => {
          this.localImg=results;
        }).catch(err => {
          //console.log('CommonService.getPackageName:' + err);
        });
      }
    }
    getPictureSuccess(imageBase64) {
      // this.isChange = true;
      // this.isimage=false;
      this.imageBase64 = <string>imageBase64;
    }
    onSubmit(f){
      let options = {
        spinner: 'circles',
        dismissOnPageChange: true,
      };

      let loading=this.loadingCtrl.create(options);
      loading.present();
      let userId=this.commonProvider.getLocalUserId();
      let imgArray1=[];
      if(userId){
        for (let i = 0; i < this.localImg.length; i++) {
          console.log('Image URI: ' + this.localImg[i]);
          this.httpProvider.uploadFile(this.localImg[i],'wesayImage').then(
            data=>{
              let res3 = data.response;
              let res4 = JSON.parse(res3);
              console.log("res4.url:", res4.url);
              imgArray1.push(res4.url);
              if(imgArray1.length==this.localImg.length){
                this.nativeProvider.getLocation().subscribe(data=>{
                  // this.lnglatXY[0]=this.locationAttr.coords.longitude;
                  // this.lnglatXY[1]=this.locationAttr.coords.latitude;
                  let geoPoint:any={
                    "__type": "GeoPoint",
                    "latitude": data.lat,
                    "longitude": data.lng
                  }
                  let lnglatXY=[];
                  lnglatXY[0]=data.lng;
                  lnglatXY[1]=data.lat;
                  let address=this.getAddress(lnglatXY);
                  console.log('执行生成wesay操作');
                  this.httpProvider.havewesayNew(this.userobjectId,imgArray1,f.value.gaming,f.value.description,geoPoint,address).subscribe(data=>{
                    console.log(data);
                    console.log(imgArray1);
                    loading.dismiss();
                    this.gotoWesay(0);
                    // data => this.navCtrl.push(AboutPage)
                  },err=>{
                    this.commonProvider.showToast(err,'bottom',3000);
                    loading.dismiss();
                  });

                });
              }
            }
          )
        }
      }else{
        this.commonProvider.showToast('亲，只有登录了才可发表哦','bottom',2000);
      }
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
        let info=result.regeocode.addressComponent;
        let address = info.city+'·'+info.district+'·'+info.township+'·'+info.street+info.streetNumber+result.regeocode.pois[0].name;
        if(info.city==""){
          address = info.province+'·'+info.district+'·'+info.township+'·'+info.street+info.streetNumber+result.regeocode.pois[0].name;
        }
        console.log(address);//返回地址描述
        return address;
      }else{
        return '';
      }
    });
  }
  gotoWesay(gaming){
    this.navCtrl.setRoot(WesayPage,{gaming:gaming});
  }
  uploadImgArray(){
    let imgArray1=[];
    return new Promise((resolve) => {

    });
  }
}
