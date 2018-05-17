import { Component } from '@angular/core';
import {Events, IonicPage, ModalController, NavController, NavParams, PopoverController} from 'ionic-angular';
import {Goods} from "../goods";
import {AddCartPage} from "../add-cart/add-cart";
import {ShoppingCartPage} from "../../mine/shoppingcart/shoppingcart";
import {CommonProvider} from "../../../providers/common/common";
import {StorageProvider} from "../../../providers/storage/storage";
import {HttpProvider} from "../../../providers/http/http";
import {LoginPage} from "../../login/login";

/**
 * Generated class for the GoodsDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-goods-details',
  templateUrl: 'goods-details.html',
})
export class GoodsDetailsPage {
  goodsdetail: Goods;
  animation:boolean=false;
  user:any;
  userobjectId:string;
  cartTotalNum:number=0;
  inLike=false;
  likeGoodsId:any=[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public popoverCtrl: PopoverController,
              public httpProvider: HttpProvider,
              public storageProvider:StorageProvider,
              public commonProvider:CommonProvider,
              public events: Events
  ) {
    this.goodsdetail=this.navParams.get('data');
    this.userobjectId=this.commonProvider.getLocalUserId();
    this.likeGoodsId = this.storageProvider.read('likeGoodsId');
    if(this.likeGoodsId && this.likeGoodsId.length>0){
      this.likeGoodsId.forEach(e=>{
        if(e==this.goodsdetail.objectId){
          this.inLike=true;
        }
      });
    }else{
      this.likeGoodsId=[];
    }
  }
  backto(){
    this.navCtrl.pop();
  }
  ionViewDidEnter(){
    this.getCartTotalNum();
  }
  presentPopover(myEvent) {
    this.userobjectId=this.commonProvider.getLocalUserId();
    if(this.userobjectId) {
      let popover = this.popoverCtrl.create(AddCartPage,{
        cb: (v,buynum) => {
          switch (v) {
            case 0://加入购物车
              this.animation = true;
              this.httpProvider.isHaveListOfUser('CartList',this.goodsdetail.objectId).subscribe(data => {

                if(data.results&&data.results.length>0)
                {

                  this.httpProvider.addCartListNum(data.results[0].objectId,buynum).subscribe(data => {

                  }, err => {
                    this.commonProvider.showToast(err, 'bottom', 3000)
                  });
                }else{
                  this.httpProvider.addCartList(this.goodsdetail.objectId,this.userobjectId,buynum).subscribe(data => {
                  }, err => {
                    this.commonProvider.showToast(err, 'bottom', 3000)
                  });
                }
                setTimeout(()=>{this.cartTotalNum=this.cartTotalNum+buynum;},950);

              }, err => {
                this.commonProvider.showToast(err, 'bottom', 3000)
              })
              // }
              setTimeout(()=>{this.animation=false;},950);
              break;
            case 1://立即购买

              break;
            default:
              break;
          }
        },
        imgUrl:this.goodsdetail.image.url,
        price:this.goodsdetail.price,
        danwei:this.goodsdetail.danwei});
      popover.present({
        ev: myEvent
      });
    }else
    {
      this.navCtrl.push(LoginPage)
    }
  }

  goToCart(){
    this.userobjectId=this.commonProvider.getLocalUserId();
    if(this.userobjectId){
      this.navCtrl.push(ShoppingCartPage);
    }else{
      this.navCtrl.push(LoginPage);
    }
  }
  getCartTotalNum(){
    this.cartTotalNum=0;
    this.httpProvider.getListOfUser('CartList','-createdAt','&include=goods').subscribe(data=>{
      if(data.results&&data.results.length>0){
        for(let i=0;i<data.results.length;i++){
          this.cartTotalNum=this.cartTotalNum+data.results[i].num;
        }
      }
    },err=>{
      this.commonProvider.showToast(err,'bottom',3000)
    })
  }
  addLikeGoods(objectId){
    this.userobjectId = this.commonProvider.getLocalUserId();
    if(this.userobjectId){
      this.httpProvider.isHaveListOfUser('LikeList',objectId).subscribe(data => {
        if(data.results&&data.results.length>0)
        {
          this.httpProvider.delete('LikeList',data.results[0].objectId).subscribe(data=>{
            let goodsIdIndex;
            this.likeGoodsId.forEach((e,index)=>{
              if(e==objectId){
                this.likeGoodsId.splice(index,1);
                goodsIdIndex=index;
              }
            });
            this.inLike=!this.inLike;
            this.storageProvider.write('likeGoodsId',this.likeGoodsId);
            this.commonProvider.showToast('取消成功','top',1500);
            // this.events.publish('opLikeList', false,objectId);


          }, err=>
          {
            this.commonProvider.showToast(err, 'bottom', 3000);
          });
        }else{
          let url = 'classes/LikeList/';
          let body ={
            "goods": {
              "__type": "Pointer",
              "className": "Goods",
              "objectId": objectId
            },
            "user": {
              "__type": "Pointer",
              "className": "_User",
              "objectId": this.userobjectId
            }
          };
          this.httpProvider.post(url,body).subscribe(data => {
            this.likeGoodsId.push(objectId);
            this.inLike=!this.inLike;
            this.storageProvider.write('likeGoodsId',this.likeGoodsId);
            this.commonProvider.showToast('收藏成功','top',1500);
          }, err => {
            this.commonProvider.showToast(err, 'bottom', 3000)
          });
        }
      }, err => {
        this.commonProvider.showToast(err, 'bottom', 3000)
      });
    }else{
      this.commonProvider.showToast('亲，先登录再操作吧！','bottom',3000)
    }
  }
}
