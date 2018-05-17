import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {GoodsListPage} from "../goods/goods-list/goods-list";
import {NativeProvider} from "../../providers/native/native";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  scanText:any;
  constructor(
    public navCtrl: NavController,
    public nativeProvider:NativeProvider,
  ) {

  }
  // gototravel(){
  //   this.navCtrl.push(TravelPage);
  // }
  gotoGoodslist() {
    this.navCtrl.push(GoodsListPage);
  }
  gotoScan(){
    if (this.nativeProvider.isMobile()) {
      this.nativeProvider.scan().subscribe(res => {
        this.scanText = res;
      });
    }
  }
  // gotocanteen(){
  //   this.navCtrl.push(CanteenPage);
  // }
  // gotoSearchPage() {
  //   this.navCtrl.push(SearchPage);
  // }
}
