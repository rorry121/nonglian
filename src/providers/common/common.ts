import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AlertController, LoadingController, ToastController} from "ionic-angular";
import {StorageProvider} from "../storage/storage";
import {AppVersion} from "@ionic-native/app-version";
import { Geolocation } from '@ionic-native/geolocation';
import {HttpProvider} from "../http/http";
/*
  Generated class for the CommonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommonProvider {
  EARTH_RADIUS = 6378137.0;    //单位M
  PI = Math.PI;
  constructor(public http: Http,
              public alertCtrl:AlertController,
              public toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              public storageProvider:StorageProvider,
              private appVersion: AppVersion,
              private geolocation: Geolocation,


  ) {
  }
  showToast(message,position,duration?) {
    if(duration) duration=2000;
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position,
      cssClass:'toastCtrlCss',
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  /**
   * 加载动画
   * @param msg 提示信息
   */
  showLoading(msg?: string) {
    let options = {
      spinner: 'circles',
      content: msg != null ? msg : "",
      dismissOnPageChange: true,
      duration: 5000
    };
    // let activePortal = this.ionicApp._loadingPortal.getActive();
    // if (activePortal) {
    //     console.log("loading exists");
    //     activePortal.onDidDismiss(() => { });
    //     activePortal.dismiss().catch(() => { });
    // }
    console.log('showLoading');
    let loading = this.loadingCtrl.create(options);
    loading.present();
    return loading;
  }
  getLocalUserId(){
    let user:any = this.storageProvider.read('userInfo');
    if(user)
    {
      return user.objectId;
    }else{
      return '';
    }
  }
  /**
   * 获取AppName
   */
  getAppName(): Promise<string> {

    return new Promise((resolve) => {
      this.appVersion.getAppName().then((name) => {
        resolve(name);
      }).catch(err => {
        //console.log('CommonService.getPackageName:' + err);
      });
    });
  }
  /**
   * 获取PackageName
   */
  getPackageName(): Promise<string> {
    // this.appVersion.getVersionCode().then(a=>{
    //     console.log("getVersionCode:"+a);
    //     // 0.0.6=>6
    //     // 0.0.8=>8
    //     // 0.1.2=>102
    //     // 3.1.2=>30102
    //     //1.2.3.5=>10203
    // });
    return new Promise((resolve) => {
      this.appVersion.getPackageName().then((name) => {
        resolve(name);
      }).catch(err => {
        //console.log('CommonService.getPackageName:' + err);
      });
    });
  }
  /**
   * 获取app版本号
   */
  getVersionNumber(): Promise<string> {
    return new Promise((resolve) => {
      this.appVersion.getVersionNumber().then((version) => {
        resolve(version);
      }).catch(err => {
        //console.log('CommonService.getVersionNumber:' + err);
      });
    });

  }
  /**
   * 定位
   */
  location(){
    return new Promise((resolve) => {
      this.geolocation.getCurrentPosition(
        {
          enableHighAccuracy: true,
        }
      ).then(resp => {
        resolve(resp);
        console.log(resp);
      }).catch(error => {
        this.toastCtrl.create({
          message: '获取位置失败', duration: 3000, position: 'top'
        }).present();
      });
    });
  }
  /**
   * 计算地球两点距离
   */
  getFlatternDistance(lat1,lng1,lat2,lng2){
  let f = this.getRad((lat1 + lat2)/2);
  let g = this.getRad((lat1 - lat2)/2);
  let l = this.getRad((lng1 - lng2)/2);

  let sg = Math.sin(g);
  let sl = Math.sin(l);
  let sf = Math.sin(f);

  let s,c,w,r,d,h1,h2;
  let a = this.EARTH_RADIUS;
  let fl = 1/298.257;

  sg = sg*sg;
  sl = sl*sl;
  sf = sf*sf;

  s = sg*(1-sl) + (1-sf)*sl;
  c = (1-sg)*(1-sl) + sf*sl;

  w = Math.atan(Math.sqrt(s/c));
  r = Math.sqrt(s*c)/w;
  d = 2*w*a;
  h1 = (3*r -1)/2/c;
  h2 = (3*r +1)/2/s;
  let distance=d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg))
  return distance;
}

 getRad(d){
  return d*this.PI/180.0;
}

}
