import {Component, ViewChild} from '@angular/core';
import { HomePage } from '../home/home';
import {WesayPage} from "../wesay/wesay";
import {GoodsListPage} from "../goods/goods-list/goods-list";
import {MinePage} from "../mine/mine";
import {HaveasayPage} from "../wesay/haveasay/haveasay";
import {StorageProvider} from "../../providers/storage/storage";
import {NavController, Tabs} from "ionic-angular";
import {CunyouPage} from "../cunyou/cunyou";

@Component({
  templateUrl: 'tabs.html',
  selector: 'page-tabs',
})
export class TabsPage {
  @ViewChild('mainTabs') tabs: Tabs
  tab1Root = CunyouPage;
  tab2Root = WesayPage;
  tab3Root = HaveasayPage;
  tab4Root = GoodsListPage;
  tab5Root = MinePage;
  constructor(public storageProvider:StorageProvider,
              public navCtrl: NavController,
  ) {
    // let user = this.storageProvider.read('userInfo');
    // console.log(user);
    // if(user){
    //   this.tab3Root=HaveasayPage;
    // }else{
    // }
  }
  switchTabs() {
    this.navCtrl.parent.select(4);
  }

}
