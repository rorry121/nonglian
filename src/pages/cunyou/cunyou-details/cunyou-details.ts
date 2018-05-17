import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {HttpProvider} from "../../../providers/http/http";
import {CommonProvider} from "../../../providers/common/common";
import {ShowMapPage} from "../../show-map/show-map";
import {NativeProvider} from "../../../providers/native/native";

/**
 * Generated class for the CunyouDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cunyou-details',
  templateUrl: 'cunyou-details.html',
})
export class CunyouDetailsPage {
  objectId:string;
  dataInfo:any={};
  ticketInfo:any;
  hotelList:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public httpProvider:HttpProvider,
              public commonProvider:CommonProvider,
              public alertCtrl: AlertController,
              public nativeProvider:NativeProvider
  ) {
    this.objectId = this.navParams.get('objectId');
    this.loadInfo();
  }

  ionViewWillLoad() {
    console.log('ionViewDidLoad CunyouDetailsPage');
    // this.loadInfo();
  }

  loadInfo(){
    let loading=this.commonProvider.showLoading()
    let url= 'classes/CunyouList/'+this.objectId+'?include=detail';
    this.httpProvider.get(url).subscribe(data=>{
      this.dataInfo=data;
      this.ticketInfo=this.dataInfo.detail.ticketInfo;
      this.hotelList=this.dataInfo.detail.hotelInfo.hotelList;
      this.addReadNum();
      loading.dismiss();
    },err=>{
      loading.dismiss();
      this.commonProvider.showToast(err,'bottom',3000)
    })
  }
  gotoMap(item){
    let lnglatXY=[];
    lnglatXY[0]= this.dataInfo.geoPoint.longitude;
    lnglatXY[1]= this.dataInfo.geoPoint.latitude;
    this.navCtrl.push(ShowMapPage,{lnglatXY:lnglatXY})
  }
  showAlert() {
    let telNum=this.dataInfo.detail.telNum;
    let alert = this.alertCtrl.create({
      title: '拨打电话',
      subTitle: '是否拨打'+telNum,
      buttons: [
        {
          text: '取消',
          handler: data => {
          }
        },
        {
          text: '确定',
          handler: data => {
            this.nativeProvider.callTelNum(this.dataInfo.detail.telNum);
          }
        }
      ]
    });
    alert.present();
  }
  addReadNum(){
    let url = 'classes/CunyouList/'+this.objectId
    let body ={
      "readNum":{
        "__op":"Increment",
        "amount":1}
    };
    console.log(body);
    this.httpProvider.put(url,body).subscribe(data=>{
      console.log('访问量加1：',this.objectId)
    },err=>{
      this.commonProvider.showToast(err,'top');
    })
  }
}
