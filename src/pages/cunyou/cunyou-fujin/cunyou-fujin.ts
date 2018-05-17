import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpProvider} from "../../../providers/http/http";
import {CommonProvider} from "../../../providers/common/common";
import {CunyouDetailsPage} from "../cunyou-details/cunyou-details";

/**
 * Generated class for the CunyouFujinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cunyou-fujin',
  templateUrl: 'cunyou-fujin.html',
})
export class CunyouFujinPage {
  lnglatXY=[116.396574, 39.992706];
  dataList:any=[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public httpProvider:HttpProvider,
              public commonProvider:CommonProvider
  ) {
    this.lnglatXY=this.navParams.get('lnglatXY');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CunyouFujinPage');
    this.loadList();
  }
  loadList(){
    let loading=this.commonProvider.showLoading();
    let url='classes/CunyouList';
    let search='?where={"geoPoint":{"$nearSphere": {"__type": "GeoPoint","latitude": '+this.lnglatXY[1]+',"longitude": '+this.lnglatXY[0]+'},"$maxDistanceInMiles": 50.0}}';
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
  getDistance(item){
    let distance= this.commonProvider.getFlatternDistance(this.lnglatXY[1],this.lnglatXY[0],item.geoPoint.latitude,item.geoPoint.longitude);
    return distance/1000;
  }
}
