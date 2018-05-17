import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {GoodsListPage} from "../goods/goods-list/goods-list";
import {NativeProvider} from "../../providers/native/native";
import {CommonProvider} from "../../providers/common/common";
import {CunyouFujinPage} from "./cunyou-fujin/cunyou-fujin";
import {CunyouMorePage} from "./cunyou-more/cunyou-more";
import {CunyouTuijianPage} from "./cunyou-tuijian/cunyou-tuijian";
import {HttpProvider} from "../../providers/http/http";
import {CunyouDetailsPage} from "./cunyou-details/cunyou-details";

/**
 * Generated class for the ChunyouPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var AMap;
@IonicPage()
@Component({
  selector: 'page-chunyou',
  templateUrl: 'cunyou.html',
})
export class CunyouPage {
  scanText:string='';
  locationAttr:any={};
  address:any={};
  lnglatXY=[106.57728, 29.494665];
  map: any;//地图对象
  district:string;
  dataList:any=[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public nativeProvider: NativeProvider,
              public commonProvider: CommonProvider,
              public httpProvider:HttpProvider
  ) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChunyouPage');
    this.getLocation();
    this.loadList()
  }
  gotoGoodslist() {
    // this.navCtrl.setRoot(GoodsListPage);
    this.navCtrl.parent.select(3);
  }
  gotoScan(){
    if (this.nativeProvider.isMobile()) {
      this.nativeProvider.scan().subscribe(res => {
        this.scanText = res;
      });
    }
  }
  getLocation(){
    this.nativeProvider.getLocation().subscribe(data=>{
      this.lnglatXY[0]=data.lng;
      this.lnglatXY[1]=data.lat;
      this.getAddress(this.lnglatXY)
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
        // let address = result.regeocode.formattedAddress; //返回地址描述
        this.district=result.regeocode.addressComponent.district;
        document.getElementById("district").innerHTML = this.district;
        console.log(this.district);
      }
    });
  }
  gotofujin(){
    this.navCtrl.push(CunyouFujinPage,{lnglatXY:this.lnglatXY})
  }
  gotomore(){
    this.navCtrl.push(CunyouMorePage,{lnglatXY:this.lnglatXY})
  }
  gototuijian(){
    this.navCtrl.push(CunyouTuijianPage,{lnglatXY:this.lnglatXY})
  }
  loadList(){
    let loading=this.commonProvider.showLoading();
    let url='classes/CunyouList';
    let search='?order=-readNum&limit=4';
    url=url+search;
    this.httpProvider.get(url).subscribe(data=>{
      console.log(data);
      if(data.results.length>0){
        this.dataList=data.results
      }
      loading.dismiss();
    },err=>{
      loading.dismiss();
      this.commonProvider.showToast(err,'bottom',3000)
    })
  }
  gotoDetails(objectId){
    this.navCtrl.push(CunyouDetailsPage,{objectId:objectId});
  }
}
