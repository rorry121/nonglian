import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {ToastController, Platform, AlertController} from "ionic-angular";
import {AppMinimize} from "@ionic-native/app-minimize";
import {Network} from "@ionic-native/network";
import {Observable} from "rxjs";
import {CommonProvider} from "../common/common";
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {BackgroundMode} from "@ionic-native/background-mode";
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import {AppConfig} from "../AppConfig";
import {FileOpener} from "@ionic-native/file-opener";
import {CallNumber} from "@ionic-native/call-number";
import { Diagnostic } from '@ionic-native/diagnostic';
/*
  Generated class for the NativeProvider provider.
  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


declare var LocationPlugin;
declare var AMapNavigation;

@Injectable()
export class NativeProvider {
  private ApkDownloadUrl: string = AppConfig.ApkDownloadUrl;
  constructor(public http: Http,
              private camera: Camera,
              private toastCtrl:ToastController,
              private alertCtrl:AlertController,
              private appMinimize: AppMinimize,
              private network: Network,
              public platform: Platform,
              private barcodeScanner: BarcodeScanner,
              public commonProvider:CommonProvider,
              private backgroundMode: BackgroundMode,
              private transfer: FileTransfer,
              private file: File,
              private fileOpener: FileOpener,
              private callNumber: CallNumber,
              private diagnostic: Diagnostic,
  ) {
    console.log('Hello NativeProvider Provider');
  }
  showToast = (message: string = '操作完成', duration: number = 2500) => {
    let toast=this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'top',
      showCloseButton: true,
      closeButtonText: '关闭'
    });
    toast.present();
  };
  /**
   * 使用cordova-plugin-camera获取照片的base64
   * @param options
   * @return {Promise<T>}
   */
  getPicture(options = {}): Promise<string> {
    let ops: CameraOptions = Object.assign({
      sourceType: this.camera.PictureSourceType.CAMERA,//图片来源,CAMERA:拍照,PHOTOLIBRARY:相册
      destinationType: this.camera.DestinationType.FILE_URI,//默认返回base64字符串,DATA_URL:base64   FILE_URI:图片路径
      quality: 50,//图像质量，范围为0 - 100
      allowEdit: true,//选择图片前是否允许编辑
      encodingType: this.camera.EncodingType.JPEG,
      // targetWidth: 400,//缩放图像的宽度（像素）
      // targetHeight: 400,//缩放图像的高度（像素）
      saveToPhotoAlbum: true,//是否保存到相册
      correctOrientation: true//设置摄像机拍摄的图像是否为正确的方向
    }, options);
    return new Promise((resolve) => {
      this.camera.getPicture(ops).then((imgData: string) => {
        resolve(imgData);
      }, (err) => {
          console.log(err)
      });
    });
  };
  /**
   * 通过图库获取照片
   * @param options
   * @return {Promise<T>}
   */
  getPictureByPhotoLibrary(options = {}): Promise<string> {
    return new Promise((resolve) => {
      this.getPicture(Object.assign({
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: this.camera.DestinationType.FILE_URI//DATA_URL: 0 base64字符串, FILE_URI: 1图片路径
      }, options)).then((imgData: string) => {
        resolve(imgData);
        console.log("imgdata",imgData);
      }).catch(err => {
        String(err).indexOf('cancel') != -1 ? this.showToast('取消选择图片', 1500) : this.showToast('获取照片失败');
      });
    });
  };

  /**
   * 通过拍照获取照片
   * @param options
   * @return {Promise<T>}
   */
  getPictureByCamera(options = {}): Promise<string> {
    return new Promise((resolve) => {
      this.getPicture(Object.assign({
        sourceType: this.camera.PictureSourceType.CAMERA,
        destinationType: this.camera.DestinationType.FILE_URI//DATA_URL: 0 base64字符串, FILE_URI: 1图片路径
      }, options)).then((imgData: string) => {
        resolve(imgData);
        console.log("imgdata1111",imgData);
      }).catch(err => {
        String(err).indexOf('cancel') != -1 ? this.showToast('取消拍照', 1500) : this.showToast('获取照片失败');
      });
    });
  };
  /**
   * 获取网络类型 如`unknown`, `ethernet`, `wifi`, `2g`, `3g`, `4g`, `cellular`, `none`
   */
  getNetworkType(): string {
    if (!this.isMobile()) {
      return 'wifi';
    }
    return this.network.type;
  }

  /**
   * 判断是否有网络
   */
  isConnecting(): boolean {
    return this.getNetworkType() != 'none';
  }

  /**
   * 调用最小化app插件
   */
  minimize(): void {
      this.commonProvider.getAppName().then(appName=>{
        this.backgroundMode.setDefaults({

          title: appName,
          text: '应用后台运行中...'
        });
        this.backgroundMode.enable();
        console.log('移到后台');
        this.backgroundMode.moveToBackground();//移到后台
        // this.appMinimize.minimize().then(e=>{
        //   console.log('minimize',e)});
      });

  }
  /**
   * 是否真机环境
   */
  isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  /**
   * 是否android真机环境
   */
  isAndroid(): boolean {
    return this.isMobile() && this.platform.is('android');
  }

  /**
   * 是否ios真机环境
   */
  isIos(): boolean {
    return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
  }

  /**
   * 拨打电话
   * @param number
   */
  callTelNum(number: string): void {
    this.callNumber.callNumber(number, true)
      .then(() => console.log('调用成功!'))
      .catch(() =>{this.commonProvider.showToast("无法拨打电话，请检查是否有拨打电话权限","top",2000)});
  }

  /**
   * 扫描二维码
   * @returns {any}
   */
  scan() {
    return Observable.create(observer => {
      this.barcodeScanner.scan().then((barcodeData) => {
        console.log(barcodeData);
        this.commonProvider.showToast(barcodeData,top,10000);
        observer.next(barcodeData.text);
      }).catch(err => {
        this.commonProvider.showToast(err,top);
        observer.error(false);
      });
    });
  }
  /**
   * 下载安装app
   */
  downloadApp(): void {
    if (this.isAndroid()) {
      let alert = this.alertCtrl.create({
        title: '下载进度：0%',
        enableBackdropDismiss: false,
        buttons: ['后台下载']
      });
      alert.present();

      const fileTransfer: FileTransferObject = this.transfer.create();
      const apk = this.file.externalApplicationStorageDirectory + 'nonglian.apk'; //apk保存的目录

      fileTransfer.download(this.ApkDownloadUrl, apk,true).then((entry) => {
        console.log("apk保存的目录:",apk);
        console.log("apk保存的目录2:"+entry.toURL());
        this.fileOpener.open(entry.toURL(),'application/vnd.android.package-archive')
          .then(()=>console.log('apk file is opened.'))
          .catch(e=>console.log("error:",JSON.stringify(e)));
      },(error)=> {
        console.log("download error:", JSON.stringify(error));
      });

      fileTransfer.onProgress((event: ProgressEvent) => {
        let num = Math.floor(event.loaded / event.total * 100);
        if (num === 100) {
          alert.dismiss();
        } else {
          let title = document.getElementsByClassName('alert-title')[0];
          title && (title.innerHTML = '下载进度：' + num + '%');
        }
      });
    }
    if (this.isIos()) {
      // this.openUrlByBrowser(APP_DOWNLOAD);
    }
  }

  /**
   * 获得用户当前坐标信息
   * 5秒内只会返回同一结果
   */
  getUserLocation = (() => {
    let lastTime = null; //  缓存上次获取定位时间
    let lastResult = null; //  缓存上次获取的结果
    return () => {
      return Observable.create(observer => {
        //  5秒内有获取过定位则不再重复获取
        if (lastTime && (new Date().getTime() - lastTime < 5000)) {
          if (lastResult) {
            observer.next(lastResult);
          } else {
            //  获取定位是异步,所以这里用定时,直到获取到结果
            const timer = setInterval(() => {
              if (lastResult) {
                clearInterval(timer);
                observer.next(lastResult);
              }
            }, 1000);
          }
        } else {
          lastTime = new Date().getTime(); //  准备获取定位时记录时间
          lastResult = null; //  每次重新获取时,需清空上次结果,以免下次一获取在5秒内直接返回上次结果
          this.getLocation().subscribe(res => {
            lastTime = new Date().getTime(); //  当获取成功,重置上次获取时间
            lastResult = res;
            observer.next(res);
          }, () => {
            lastTime = null;
          });
        }
      });
    };
  })();

  /**
   * 获取位置
   */
  getLocation() {
    return Observable.create(observer => {
      if (this.isMobile()) {
        //  检查app是否开始位置服务和定位权限.没有则会请求权限
        Observable.zip(this.assertLocationService(), this.assertLocationAuthorization()).subscribe(() => {
          LocationPlugin.getLocation(data => {
            //  android返回data形如:{"locationType":4,"latitude":23.119225,"longitude":113.350784,"hasAccuracy":true,"accuracy":29,"address":"广东省广州市天河区潭乐街靠近广电科技大厦","country":"中国","province":"广东省","city":"广州市","district":"天河区","street":"平云路","cityCode":"020","adCode":"440106","aoiName":"广电平云广场","speed":0,"bearing":0,"time":1515976535559}
            //  其中locationType为定位来源.定位类型对照表: http://lbs.amap.com/api/android-location-sdk/guide/utilities/location-type/
            //  iOS只会返回data形如:{longitude: 113.35081420800906, latitude: 23.119172707345594}
            console.log('定位信息', data);
            observer.next({'lng': data.longitude, 'lat': data.latitude});
          }, msg => {
            if (msg.indexOf('缺少定位权限') != -1 || (this.isIos() && msg.indexOf('定位失败') != -1)) {
              this.alertCtrl.create({
                title: '缺少定位权限',
                subTitle: '请在手机设置或app权限管理中开启',
                buttons: [{text: '取消'},
                  {
                    text: '去开启',
                    handler: () => {
                      // this.diagnostic.switchToSettings();
                    }
                  }
                ]
              }).present();
            } else if (msg.indexOf('WIFI信息不足') != -1) {
              alert('定位失败,请确保连上WIFI或者关掉WIFI只开流量数据');
            } else if (msg.indexOf('网络连接异常') != -1) {
              alert('网络连接异常,请检查您的网络是否畅通');
            } else {
              alert('获取位置错误,错误消息:' + msg);
              // this.logger.log(msg, '获取位置失败');
            }
            observer.error('获取位置失败');
          });
        }, err => {
          observer.error(err);
        });
      } else {
        console.log('非手机环境,即测试环境返回固定坐标');
        observer.next({'lng': 113.350912, 'lat': 23.119495});
      }
    });
  }

  // 检测app位置服务是否开启
  private assertLocationService = (() => {
    let enabledLocationService = false; // 手机是否开启位置服务
    return () => {
      return Observable.create(observer => {
        if (enabledLocationService) {
          observer.next(true);
        } else {
          this.diagnostic.isLocationEnabled().then(enabled => {
            if (enabled) {
              enabledLocationService = true;
              observer.next(true);
            } else {
              enabledLocationService = false;
              this.alertCtrl.create({
                title: '您未开启位置服务',
                subTitle: '正在获取位置信息',
                buttons: [{text: '取消'},
                  {
                    text: '去开启',
                    handler: () => {
                      this.diagnostic.switchToLocationSettings();
                    }
                  }
                ]
              }).present();
              observer.error(false);
            }
          }).catch(err => {
            // this.logger.log(err, '调用diagnostic.isLocationEnabled方法失败');
            observer.error(false);
          });
        }
      });
    };
  })();

  // 检测app是否有定位权限,如果没有权限则会请求权限
  private assertLocationAuthorization = (() => {
    let locationAuthorization = false;
    return () => {
      return Observable.create(observer => {
        if (locationAuthorization) {
          observer.next(true);
        } else {
          this.diagnostic.isLocationAuthorized().then(res => {
            if (res) {
              locationAuthorization = true;
              observer.next(true);
            } else {
              locationAuthorization = false;
              this.diagnostic.requestLocationAuthorization('always').then(res => {// 请求定位权限
                if (res == 'DENIED_ALWAYS') {// 拒绝访问状态,必须手动开启
                  locationAuthorization = false;
                  this.alertCtrl.create({
                    title: '缺少定位权限',
                    subTitle: '请在手机设置或app权限管理中开启',
                    buttons: [{text: '取消'},
                      {
                        text: '去开启',
                        handler: () => {
                          this.diagnostic.switchToSettings();
                        }
                      }
                    ]
                  }).present();
                  observer.error(false);
                } else {
                  locationAuthorization = true;
                  observer.next(true);
                }
              }).catch(err => {
                // this.logger.log(err, '调用diagnostic.requestLocationAuthorization方法失败');
                observer.error(false);
              });
            }
          }).catch(err => {
            // this.logger.log(err, '调用diagnostic.isLocationAvailable方法失败');
            observer.error(false);
          });
        }
      });
    };
  })();

}
