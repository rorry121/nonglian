import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommonProvider} from "../../../providers/common/common";
import {HttpProvider} from "../../../providers/http/http";
import {CunyouDetailsPage} from "../cunyou-details/cunyou-details";

/**
 * Generated class for the CunyouTuijianPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cunyou-tuijian',
  templateUrl: 'cunyou-tuijian.html',
})
export class CunyouTuijianPage {
  dataList:any=[];
  lnglatXY=[116.396574, 39.992706];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public commonProvider:CommonProvider,
              public httpProvider:HttpProvider
  ) {
    this.lnglatXY=this.navParams.get('lnglatXY');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CunyouTuijianPage');
    this.loadList();
  }
  loadList(){
    let loading=this.commonProvider.showLoading();
    let url='classes/CunyouList';
    let search='?order=-readNum';
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
