/**
 * Created by sc on 2017/5/15.
 */
import {Component} from "@angular/core";
import {NavController, NavParams, Events} from "ionic-angular";
import {HttpProvider} from "../../../providers/http/http";
import {GoodsDetailsPage} from "../../goods/goods-details/goods-details";
import {CommonProvider} from "../../../providers/common/common";
import {StorageProvider} from "../../../providers/storage/storage";

@Component({
  selector: 'page-likelist',
  templateUrl: 'likelist.html'
})
export class LikeListPage {
  likeGoodslist=[];
  likeGoodsId=[];
  userId:string='';
  constructor(public navCtrl: NavController,
              public httpProvider: HttpProvider,
              public navParams: NavParams,
              public commonProvider:CommonProvider,
              public storageProvider:StorageProvider,
              public events: Events
    ) {
    this.userId = this.navParams.data.userId;
    this.loadLikeGoods();
    this.events.subscribe('opLikeList',(op,objectId)=>{
      if(!op)
      {
        let goodsIdIndex;
        this.likeGoodsId.forEach((e,index)=>{
          if(e==objectId){
            this.likeGoodsId.splice(index,1);
            goodsIdIndex=index;
          }
        });
        if(goodsIdIndex){
          this.likeGoodslist.splice(goodsIdIndex,1);
        }
      }
    });
  }
  ionViewDidLoad(){

  }
  loadLikeGoods(){
    this.likeGoodslist=[];
    let loading = this.commonProvider.showLoading();
    // let url = 'classes/LikeList/'+'?where={"user":{"__type": "Pointer","className": "_User","objectId":"'+ this.userId+'"}}&include=goods&order=-createdAt';
    this.httpProvider.getListOfUser('LikeList','-createdAt','&include=goods').subscribe(data=>{
      if(data.results&&data.results.length>0){
        this.likeGoodslist=data.results;
        // this.likeGoodsId=[];
        // this.likeGoodslist.forEach(e=>{
        //   this.likeGoodsId.push(e.goods.objectId);
        // });
        // this.storageProvider.write('likeGoodsId',this.likeGoodsId);
      }
      loading.dismiss();
    },err=>{
      this.commonProvider.showToast(err,'bottom',3000)
      loading.dismiss();
    })
  }
  gotoGoodsdetailPage(data){
    this.navCtrl.push(GoodsDetailsPage,{data:data});
  }
  doRefresh(refresher){
    this.likeGoodslist=[];
    this.loadLikeGoods();
    setTimeout(() => {
      refresher.complete();
    }, 700);
  }
}
