import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {WesayPageModule} from "../pages/wesay/wesay.module";
import {GoodsDetailsPageModule} from "../pages/goods/goods-details/goods-details.module";
import {GoodsListPageModule} from "../pages/goods/goods-list/goods-list.module";
import { HttpProvider } from '../providers/http/http';
import { HttpModule} from "@angular/http";
import { NativeProvider } from '../providers/native/native';
import { Camera} from '@ionic-native/camera';
import { CommonProvider } from '../providers/common/common';
import {FileTransfer,FileTransferObject} from "@ionic-native/file-transfer";
import { File } from '@ionic-native/file';
import {StorageProvider} from "../providers/storage/storage";
import {MinePageModule} from "../pages/mine/mine.module";
import {MinePage} from "../pages/mine/mine";
import {LoginPageModule} from "../pages/login/login.module";
import {RegisterPageModule} from "../pages/register/register.module";
import {AddCartPageModule} from "../pages/goods/add-cart/add-cart.module";
import {AddCartPage} from "../pages/goods/add-cart/add-cart";
import { BackgroundMode } from '@ionic-native/background-mode';
import {AppVersion} from "@ionic-native/app-version";
import {AppMinimize} from "@ionic-native/app-minimize";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {Network} from "@ionic-native/network";
import {ConfirmOrderPageModule} from "../pages/confirm-order/confirm-order.module";
import {ConfirmOrderPage} from "../pages/confirm-order/confirm-order";
import {PaymentPageModule} from "../pages/payment/payment.module";
import {PaymentPage} from "../pages/payment/payment";
import {ImgSlidesPageModule} from "../pages/img-slides/img-slides.module";
import {CunyouPageModule} from "../pages/cunyou/cunyou.module";
import {CunyouPage} from "../pages/cunyou/cunyou";
import { Geolocation } from '@ionic-native/geolocation';
import {FileOpener} from "@ionic-native/file-opener";
import {CunyouFujinPage} from "../pages/cunyou/cunyou-fujin/cunyou-fujin";
import {CunyouFujinPageModule} from "../pages/cunyou/cunyou-fujin/cunyou-fujin.module";
import {ShowMapPage} from "../pages/show-map/show-map";
import {ShowMapPageModule} from "../pages/show-map/show-map.module";
import {CunyouMorePageModule} from "../pages/cunyou/cunyou-more/cunyou-more.module";
import {CunyouMorePage} from "../pages/cunyou/cunyou-more/cunyou-more";
import {CunyouTuijianPageModule} from "../pages/cunyou/cunyou-tuijian/cunyou-tuijian.module";
import {CunyouTuijianPage} from "../pages/cunyou/cunyou-tuijian/cunyou-tuijian";
import {CunyouDetailsPageModule} from "../pages/cunyou/cunyou-details/cunyou-details.module";
import {CunyouDetailsPage} from "../pages/cunyou/cunyou-details/cunyou-details";
import {CallNumber} from "@ionic-native/call-number";
import {FooterInputPage} from "../pages/footer-input/footer-input";
import {FooterInputPageModule} from "../pages/footer-input/footer-input.module";
import {EmojiPickerComponentModule} from "../pages/emoji-picker/emoji-picker.module";
import { Diagnostic } from '@ionic-native/diagnostic';
import { JpushProvider } from '../providers/jpush/jpush';
import {JPush} from "@jiguang-ionic/jpush";
import {IonJPushModule} from "ionic2-jpush";
import {ChatPage} from "../pages/chat/chat";
import {ChatPageModule} from "../pages/chat/chat.module";
import {ImagePicker} from "@ionic-native/image-picker";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: 'true', //隐藏全部子页面tabs
      backButtonText: '',
      mode:'ios'
    }),
    WesayPageModule,
    GoodsDetailsPageModule,
    GoodsListPageModule,
    HttpModule,
    MinePageModule,
    LoginPageModule,
    RegisterPageModule,
    AddCartPageModule,
    ConfirmOrderPageModule,
    PaymentPageModule,
    ImgSlidesPageModule,
    CunyouPageModule,
    CunyouFujinPageModule,
    ShowMapPageModule,
    CunyouMorePageModule,
    CunyouTuijianPageModule,
    CunyouDetailsPageModule,
    FooterInputPageModule,
    EmojiPickerComponentModule,
    IonJPushModule,
    ChatPageModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    MinePage,
    AddCartPage,
    ConfirmOrderPage,
    PaymentPage,
    CunyouPage,
    CunyouFujinPage,
    ShowMapPage,
    CunyouMorePage,
    CunyouTuijianPage,
    CunyouDetailsPage,
    FooterInputPage,
    ChatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpProvider,
    NativeProvider,
    Camera,
    CommonProvider,
    FileTransfer,FileTransferObject,
    File,
    StorageProvider,
    BackgroundMode,AppVersion,AppMinimize,Network,BarcodeScanner,Geolocation,FileOpener,CallNumber,Diagnostic,
    JpushProvider,JPush,ImagePicker
  ]
})
export class AppModule {}
