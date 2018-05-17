import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ShoppingCartPage} from "./shoppingcart/shoppingcart";
import {NeedPayPage} from "./needpay/needpay";
import {WaitSendPage} from "./waitsend/waitsend";
import {WaitGetPage} from "./waitget/waitget";
import {NeedEstimatePage} from "./needestimate/needestimate";
import {AfterSalePage} from "./aftersale/aftersale";
import {LikeListPage} from "./likelist/likelist";
import {EyeListPage} from "./eyelist/eyelist";
import {StarListPage} from "./startlist/starlist";
import {LoginPage} from "../login/login";
import {StorageProvider} from "../../providers/storage/storage";
import {HttpProvider} from "../../providers/http/http";
import {CommonProvider} from "../../providers/common/common";
import {WaitforgoodscommentPage} from "./waitforgoodscomment/waitforgoodscomment";
import {UserCenterPage} from "./user-center/user-center";
import {ImgSlidesPage} from "../img-slides/img-slides";

@IonicPage()
@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html',
})
export class MinePage{
    myOrderList = [
        {title: "待付款",component:NeedPayPage,name:"assets/img/mine1.png"},
        {title: "待发货",component:WaitSendPage,name:"assets/img/mine2.png"},
        {title: "待收货",component:WaitGetPage,name:"assets/img/mine3.png"},
        {title: "待评价",component:WaitforgoodscommentPage,name:"assets/img/mine4.png"},
        {title: "退换货",component:AfterSalePage,name:"assets/img/mine5.png"}
        ];
    myFisrtList = [
      {title: "购物车",component:ShoppingCartPage,num:0,name:''},
      {title: "收藏商品",component:LikeListPage,num:0,name:''},
      {title: "收藏店铺",component:EyeListPage,num:0,name:''},
      {title: "个人资料",component:UserCenterPage,num:0,name:"ios-create-outline"}
      ];
    mySpaceList = [
      {title: "关注的人",component:StarListPage,num:2},
      {title: "wesay",component:EyeListPage,num:0},
      {title: "评论",component:LikeListPage,num:15},
      {title: "收藏",component:LikeListPage,num:0}
      ];
    myHtmlList= [
      {title: "签到领钱",component:NeedPayPage,name:"assets/img/mine1-1.png"},
      {title: "一起拼团",component:WaitSendPage,name:"assets/img/mine1-2.png"},
      {title: "试试手气",component:WaitGetPage,name:"assets/img/mine1-3.png"},
      {title: "活动中心",component:NeedEstimatePage,name:"assets/img/mine1-4.png"},
      {title: "意见反馈",component:AfterSalePage,name:"assets/img/mine2-1.png"},
      {title: "售后服务",component:AfterSalePage,name:"assets/img/mine2-2.png"},
      {title: "交易记录",component:AfterSalePage,name:"assets/img/mine2-3.png"},
      {title: "我的评价",component:AfterSalePage,name:"assets/img/mine2-4.png"}
      ];
    isLogined: boolean=false;
    userInfo: any;
    cartTotalNum:number=0;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storageProvider:StorageProvider,
              // public alertCtrl:AlertController,
              // public nativeProvider:NativeProvider,
              public httpProvider:HttpProvider,
              public commonProvider:CommonProvider
  ) {
  }
  gotologin(){
    this.navCtrl.push(LoginPage);
  }
  ionViewDidEnter(){
    this.userInfo = this.storageProvider.read('userInfo');
    if(this.userInfo){
      this.loadLikeNum(this.userInfo.objectId);
      this.isLogined=true;
      this.getCartTotalNum();
    }
  }
  logout() {
    this.storageProvider.write('userInfo', '');
    this.storageProvider.write('likeGoodsId','')
    this.navCtrl.setRoot( MinePage);
  }
 loadLikeNum(userobjectId){
   this.httpProvider.getListOfUser('LikeList','-createdAt','&count=1&limit=0').subscribe(data=>{
       this.myFisrtList[1].num=data.count;
   },err=>{
     this.commonProvider.showToast(err,'bottom',3000)
   })
 }
  getCartTotalNum(){
    this.httpProvider.getListOfUser('CartList','-createAt','&include=goods').subscribe(data=>{
      let totalNum=0;
      if(data.results&&data.results.length>0){
        for(let i=0;i<data.results.length;i++){
          totalNum=totalNum+data.results[i].num;
        }
      }
      this.myFisrtList[0].num=totalNum;
    },err=>{
      this.commonProvider.showToast(err,'bottom',3000)
    })
  }
  otherPage(page){
   if(this.userInfo){
     this.navCtrl.push(page,{userId:this.userInfo.objectId});
   }else{
     this.navCtrl.push(LoginPage);
   }
  }
  showImg(imgUrl){
    let imgUrls = [];
    imgUrls.push(imgUrl);
    this.navCtrl.push(ImgSlidesPage,{imgUrls:imgUrls});
  }
}
