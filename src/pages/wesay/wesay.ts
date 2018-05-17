import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, PopoverController} from 'ionic-angular';
import {User, WesayType} from "./wesay-type";
import {HttpProvider} from "../../providers/http/http";
import {HaveasayPage} from "./haveasay/haveasay";
import {LoginPage} from "../login/login";
import {CommonProvider} from "../../providers/common/common";
import {ShowMapPage} from "../show-map/show-map";
import {FooterInputPage} from "../footer-input/footer-input";

/**
 * Generated class for the WesayPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wesay',
  templateUrl: 'wesay.html',
})
export class WesayPage {
  foot=[
    // "ios-navigate-outline","ios-chatboxes-outline","md-heart-outline","ios-git-merge-outline"
    {iconname: "ios-navigate-outline",fnc:(item)=>{this.goToMap(item)}},
    {iconname: "ios-chatboxes-outline",fnc:(item)=>{this.showModal(item)}},
    {iconname: "md-heart-outline",fnc:(item)=>{this.goToMap(item)}},
    {iconname: "ios-git-merge-outline",fnc:(item)=>{this.goToMap(item)}}
  ];
  wesays: WesayType[]=[];
  owner: User[];
  pageIndex: number=1;
  pageSize:number=5;
  wesayType: number=0;
  selectedType: number=0;
  ch1 = [
    {title: "乡味",type:0},
    {title: "村游",type:1},
    {title: "评评特产",type:2},
    {title: "看看家乡",type:3}
  ];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpProvider: HttpProvider,
    public commonProvider:CommonProvider,
    public popoverCtrl: PopoverController,
  ) {
    let wsType=this.navParams.data.gaming;
    console.log('wsType',wsType);
    if(wsType){
      this.wesayType=parseInt(wsType);
      this.selectedType=parseInt(wsType);
    }else{
      this.wesayType=0;
      this.selectedType=0;
    }
    console.log('wesayType',this.wesayType)
    this.jiazai(this.pageIndex,this.wesayType);
    console.log('this.wesays',this.wesays);
  }
  doInfinite(infiniteScroll) {
    this.pageIndex++;
    this.jiazai(this.pageIndex,this.wesayType);
    setTimeout(() => {
      infiniteScroll.complete();
    },700);
    console.log(this.wesays);
  }
  doRefresh(refresher) {
    console.log('refresher operation', refresher);
    this.reload();
    setTimeout(() => {
      console.log('refresher operation has ended');
      refresher.complete();
    }, 700);
  }
  jiazaibybanner(selectedIndex){
    this.selectedType=selectedIndex;
    this.wesayType=selectedIndex;
    console.log("分类：",this.wesayType)
    this.reload();
  }
  jiazai(pageIndex,wesayType){
    const startNum = pageIndex * 5 - 5 ;
    let searchBy='?where={"type":{"$lte":'+wesayType+',"$gte":'+wesayType+'}}';
    let url='classes/wesay/'+searchBy+'&limit=5&skip=' + startNum+'&order=-createdAt&include=owner';

    this.httpProvider.get(url).subscribe(data=>{
      let a: WesayType[]=[];
      a=data.results;
      if(a.length!=0){
        console.log('data.results',a)
        this.wesays.push(...a);
      }
    },err=>{
      this.commonProvider.showToast(err,'bottom',3000)
    })
  }
  ionViewDidLoad() {
  }
  reload(){
    this.pageIndex=1;
    this.wesays=[];
    this.jiazai(this.pageIndex,this.wesayType);
  }
  gotologin(){
    this.navCtrl.push(LoginPage);
  }
  gotoHaveasayPage(){
    // var token = localStorage.getItem('session_token');
    // if (token =='' || token == null) {
    //   this.gotologin();
    // }
    // if (token) {
      this.navCtrl.push( HaveasayPage );
    // }
  }
  goToMap(item){
    let lnglatXY=[];
    lnglatXY[0]=item.longitude;
    lnglatXY[1]=item.latitude;
    this.navCtrl.push(ShowMapPage,{lnglatXY:lnglatXY})
  }
  showModal(item){
      let popover = this.popoverCtrl.create(FooterInputPage,{});
      popover.present();
  }

}
