import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Goods} from "../goods";
import {HttpProvider} from "../../../providers/http/http";
import {GoodsDetailsPage} from "../goods-details/goods-details";
import {StorageProvider} from "../../../providers/storage/storage";
import {CommonProvider} from "../../../providers/common/common";

/**
 * Generated class for the GoodsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-goods-list',
  templateUrl: 'goods-list.html',
})
export class GoodsListPage {
  goods: Goods[]=[];
  user:any;
  likeGoodsId:any=[];
  userobjectId:string='';
  pageIndex: number=1;
  pageSize:number=5;
  search: string='';
  orderBy:string='-createdAt';
  goodsType:number=0;
  upprice: boolean;
  upsales: boolean;
  bannerValue: string='1';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public httpProvider: HttpProvider,
              public storageProvider:StorageProvider,
              public commonProvider:CommonProvider
  ) {
  }
  onInput($event,myInput){
    myInput=myInput.replace(/ /g, "");
    this.search=myInput;
    this.reload();
  }
  doRefresh(refresher) {
    this.reload();
    setTimeout(() => {
      refresher.complete();
    }, 700);
  }
  doInfinite(infiniteScroll) {
    this.pageIndex++;
    this.jiazai(this.pageIndex,this.search,this.orderBy,this.goodsType);
    setTimeout(() => {
      infiniteScroll.complete();
    }, 500);
  }
  ionViewDidEnter(){
    console.log('ionViewDidEnter');
    this.userobjectId= this.commonProvider.getLocalUserId();
    let st=this.storageProvider.read('likeGoodsId');
    if(this.userobjectId) {
      if(st){
        this.likeGoodsId=st;
      }else{
        this.loadLikeGoods(this.userobjectId);
      }
    }else{
      this.likeGoodsId=[];
    }
  }
  ionViewWillLoad() {
    this.jiazai(this.pageIndex,this.search,this.orderBy,this.goodsType);
  }
  jiazai(pageIndex,search,orderBy,goodsType){
    const startNum = pageIndex * this.pageSize - this.pageSize ;
    let fl: string=',"fenlei":{"$lte":'+goodsType+',"$gte":'+goodsType+'}'
    if(goodsType===0){
      fl="";
    }
    let searchBy='?where={"title":{"$regex":"'+search+'"}'+fl+'}';
    let url='classes/Goods/'+searchBy+'&limit='+this.pageSize+'&skip=' + startNum+'&order='+orderBy;
    this.httpProvider.get(url).subscribe(data=>{
      let a: Goods[]=[];
      a=data.results;
      if(a.length!=0){
          this.goods.push(...a);
        }
    },err=>{
      this.commonProvider.showToast(err,'bottom',3000)
    })
  }
  reload(){
    this.pageIndex=1;
    this.goods=[];
    this.jiazai(this.pageIndex,this.search,this.orderBy,this.goodsType);
  }
  jiazaibyprice(){
    this.upsales=null;
    this.upprice=!this.upprice;
    this.orderBy=this.upprice?"price":"-price";
    this.reload();
  }
  jiazaibytime(){
    this.upprice=null;
    this.upsales=null;
    this.orderBy="-createdAt"
    this.reload();
  }
  jiazaibysales(){
    this.upprice=null;
    this.upsales=!this.upsales;
    this.orderBy=this.upsales?"sales":"-sales";
    this.reload();
  }
  jiazaibybanner(selectedIndex){
    this.reload();
  }
  gotoGoodsdetailPage(data){
    this.navCtrl.push(GoodsDetailsPage,{data:data});
  }
  back() {
    this.navCtrl.pop();
  }
  addLikeGoods(event,objectId){
    event.stopPropagation();
    this.userobjectId = this.commonProvider.getLocalUserId();
    if(!this.userobjectId) {
      this.likeGoodsId=[];
    }
    if(this.userobjectId){
      // let op:boolean=true;
      // let notHas:boolean=true;
      // this.likeGoodsId.forEach((e,index)=>{
      //   if(e==objectId){
      //     this.likeGoodsId.splice(index,1);
      //     op=false;
      //     notHas=false;
      //   }
      // })
      // if(notHas){
      //   this.likeGoodsId.push(objectId);
      // }
      this.httpProvider.isHaveListOfUser('LikeList',objectId).subscribe(data => {
        if(data.results&&data.results.length>0)
        {
          this.httpProvider.delete('LikeList',data.results[0].objectId).subscribe(data=>{
            this.likeGoodsId.forEach((e,index)=>{
              if(e==objectId){
                this.likeGoodsId.splice(index,1);
              }
            });
            this.storageProvider.write('likeGoodsId',this.likeGoodsId);
            this.commonProvider.showToast('取消成功','top',1500);

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
            this.commonProvider.showToast('收藏成功','top',1500);
            this.storageProvider.write('likeGoodsId',this.likeGoodsId);
          }, err => {
            this.commonProvider.showToast(err, 'bottom', 3000)
          });
        }
      }, err => {
        this.commonProvider.showToast(err, 'bottom', 3000)
      });

      // this.httpProvider.relationOp('classes/_User',this.userobjectId,'likeGoods',op,'Goods',objectId).subscribe(data=>{
      //   if(op){
      //     this.commonProvider.showToast('收藏成功','top',1500);
      //   }else{
      //     this.commonProvider.showToast('取消成功','top',1500);
      //   }
      // },err=>{
      //   this.commonProvider.showToast(err,'bottom',3000)
      // })
    }else{
      this.commonProvider.showToast('亲，先登录再操作吧！','bottom',3000)
    }

  }
  loadLikeGoods(userobjectId){
    this.likeGoodsId=[];
    let url = 'classes/LikeList/'+'?where={"user":{"__type": "Pointer","className": "_User","objectId":"'+ this.userobjectId+'"}}';
    this.httpProvider.get(url).subscribe(data=>{
      data.results.forEach(
        e=>{
          this.likeGoodsId.push(e.goods.objectId);
        }
      );
      this.storageProvider.write('likeGoodsId',this.likeGoodsId);
    },err=>{
      this.commonProvider.showToast(err,'bottom',3000)
    })
  }
  include(objectId){
    let a:boolean=false;
    this.likeGoodsId.forEach((e,index)=>{
      if(e==objectId){
        a=true;
      }
    });
    return a;
  }

}

