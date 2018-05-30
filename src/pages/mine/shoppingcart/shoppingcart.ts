import {Component, QueryList, ViewChild, ViewChildren, ElementRef} from "@angular/core";
import {AlertController, Content, NavController, NavParams} from "ionic-angular";
import {HttpProvider} from "../../../providers/http/http";
import {CommonProvider} from "../../../providers/common/common";
import {GoodsDetailsPage} from "../../goods/goods-details/goods-details";
import {ConfirmOrderPage} from "../../confirm-order/confirm-order";

@Component({
  selector: 'page-shoppingcart',
  templateUrl: 'shoppingcart.html'
})
export class ShoppingCartPage {
  @ViewChildren('ionInput') numInput:QueryList<ElementRef>;
  @ViewChild(Content) content: Content;
  userId:string;
  dataList:any=[];
  totalCartListNum: number=0;
  totalMoney:number=0;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public httpProvider: HttpProvider,
              public commonProvider:CommonProvider,
              public alertCtrl: AlertController
  ) {
    this.userId = this.commonProvider.getLocalUserId();
  }
  ionViewDidLoad(){
    this.loadCartList();
  }
  loadCartList(){
    let loading=this.commonProvider.showLoading();
    this.httpProvider.getListOfUser('CartList','-createdAt','&include=goods').subscribe(data=>{
      if(data.results&&data.results.length>0){
        this.dataList=data.results;
        for(let i=0;i<data.results.length;i++){
          this.totalCartListNum=this.totalCartListNum+data.results[i].num;
          this.totalMoney=this.totalMoney+data.results[i].num*data.results[i].goods.price
        }
      }
      loading.dismiss();
    },err=>{
      loading.dismiss();
      this.commonProvider.showToast(err,'bottom',3000);
    })
  }
  changeBuyNum(add,item,index){
    if (add) {
      let loading=this.commonProvider.showLoading();
      this.httpProvider.addCartListNum(item.objectId,1).subscribe(data=>{
        this.dataList[index].num++;
        loading.dismiss();
      }, err => {
        this.commonProvider.showToast(err, 'bottom', 3000)
      });
    } else {
      if(this.dataList[index].num > 1){
        let loading=this.commonProvider.showLoading();
        this.httpProvider.addCartListNum(item.objectId,-1).subscribe(data=>{
          this.dataList[index].num--;
          loading.dismiss();
        }, err => {
          this.commonProvider.showToast(err, 'bottom', 3000)
        });
      }if(this.dataList[index].num == 1){
        let alert = this.alertCtrl.create({
          title: '清除商品',
          subTitle: '是否从购物车中清除这件商品',
          cssClass: '',
          buttons: [
            {
              text: '返回',
              handler: data => {
              }
            },
            {
              text: '确定',
              handler: data => {
                let loading=this.commonProvider.showLoading();
                this.httpProvider.delete('CartList',item.objectId).subscribe(data=>{
                  loading.dismiss();
                  this.totalMoney = this.totalMoney - this.dataList[index].goods.price;
                  this.totalCartListNum--;
                  this.dataList.splice(index,1);
                }, err => {
                  this.commonProvider.showToast(err, 'bottom', 3000)
                });
              }
            }
          ]
        });
        alert.present();
      }
      }
    }
  countToalMoney(i){
    // if(!this.dataList[i].num){
    //   this.dataList[i].num=0;
    // }
    this.totalMoney=0;
    let countNum=0;
    for(let i=0;i<this.dataList.length;i++){
      this.totalMoney=this.totalMoney+this.dataList[i].num*this.dataList[i].goods.price
    }
    for(let i=0;i<this.dataList.length;i++){
      if(this.dataList[i].num!=''){
        countNum=countNum+parseFloat(this.dataList[i].num);
      }
    }
    this.totalCartListNum=countNum;
  }
  gotoGoodsdetail(data){
    this.navCtrl.push(GoodsDetailsPage,{data:data});
  }
  lose(i){
    if(this.dataList[i].num==''){
      this.dataList[i].num=1;
    }
    this.httpProvider.updateCartListNum(this.dataList[i].objectId,this.dataList[i].num).subscribe(data=>{

    }, err => {
      this.commonProvider.showToast(err, 'bottom', 3000)
    })
  }
  focusOnInput(ev,i){
    this.numInput.forEach((e,index) =>{
      if(index==i){
        let top=e.nativeElement.getBoundingClientRect().top;
        this.content.scrollTo(0,top,200);
      }
    })
  }
  goToConfirm(){
    this.navCtrl.push(ConfirmOrderPage,{cartGoods:this.dataList,totalNum:this.totalCartListNum,totalMoney:this.totalMoney});
  }
}
