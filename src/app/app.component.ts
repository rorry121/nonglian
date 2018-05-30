import { Component, ViewChild } from '@angular/core';
import {IonicApp, Keyboard, Platform, ToastController,Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import {BackgroundMode} from "@ionic-native/background-mode";
import {CommonProvider} from "../providers/common/common";
import {NativeProvider} from "../providers/native/native";
import {HttpProvider} from "../providers/http/http";
import {JpushProvider} from "../providers/jpush/jpush";
import {StorageProvider} from "../providers/storage/storage";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('rootNav') nav: Nav;
  rootPage:any = TabsPage;
  backButtonPressedOnceToExit=false;
  userInfo:any={};
  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public keyboard: Keyboard,
              public ionicApp: IonicApp,
              private backgroundMode: BackgroundMode,
              public commonProvider: CommonProvider,
              public toastCtrl: ToastController,
              public nativeProvider:NativeProvider,
              public httpProvider:HttpProvider,
              public jpushProvider:JpushProvider,
              public storageProvider:StorageProvider,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.nativeProvider.assertLocationAuthorization();
      this.userInfo=this.storageProvider.read('userInfo');
      console.log('userInfo:',this.userInfo);
      if(this.userInfo&&this.userInfo.objectId){
        this.jpushProvider.changeAlias(this.userInfo.objectId);
      }
      this.jpushProvider.jPushSet();
      this.assertNetwork();
      // this.httpProvider.login(body)
      this.registerBackButtonAction();
    });
  }

  assertNetwork() {
    if (!this.nativeProvider.isConnecting()) {
      this.toastCtrl.create({
        message: '未检测到网络,请连接网络',
        showCloseButton: true,
        closeButtonText: '确定'
      }).present();
    }
  }
  /**
   * 注册返回按键事件
   */
  registerBackButtonAction() {
    if (!this.nativeProvider.isAndroid()) {
      return;
    }
    this.platform.registerBackButtonAction(() => {
      if (this.keyboard.isOpen()) {//如果键盘开启则隐藏键盘
        this.keyboard.close();
        return;
      }
      //如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上
      // this.ionicApp._toastPortal.getActive() ||this.ionicApp._loadingPortal.getActive()|| this.ionicApp._overlayPortal.getActive()
      let activePortal = this.ionicApp._modalPortal.getActive()|| this.ionicApp._toastPortal.getActive() || this.ionicApp._overlayPortal.getActive();
      if (activePortal) {
        activePortal.dismiss();
        return;
      }
      let activeVC = this.nav.getActive();
      let tabs = activeVC.instance.tabs;
      let activeNav = tabs.getSelected();
      return activeNav.canGoBack() ? activeNav.pop() : this.nativeProvider.minimize();//this.showExit()
    }, 1);
  }
  /**
   * 退出App
   */
  exitApp() {
    if (this.backButtonPressedOnceToExit) { //当触发标志为true时，即2秒内双击返回按键则退出APP
      //this.platform.exitApp();
      this.commonProvider.getAppName().then(appName=>{
        this.backgroundMode.setDefaults({

          title: appName,
          text: '应用后台运行中...'
        });
        this.backgroundMode.enable();
        this.backgroundMode.moveToBackground();//移到后台
      });
    } else {
      this.toastCtrl.create({
        message: '再按一次退出应用',
        duration: 2000,
        position: 'top'
      }).present();
      this.backButtonPressedOnceToExit = true;
      setTimeout(() => this.backButtonPressedOnceToExit = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false
    }
  }

}
