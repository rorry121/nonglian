import {Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {CommonProvider} from "../../providers/common/common";

/**
 * Generated class for the ShowMapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var AMap;
declare var AMapUI;
@IonicPage()
@Component({
  selector: 'page-show-map',
  templateUrl: 'show-map.html',
})
export class ShowMapPage {
  @ViewChild('map_container') map_container: ElementRef;
  map: any;//地图对象
  lnglatXY=[106.57728, 29.494665];
  localLnglatXY=[106.57728, 29.494665];
  locationAttr:any={};
  address:string='';
  ways:number=0;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public commonProvider:CommonProvider
  ) {
    this.lnglatXY=navParams.get('lnglatXY');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowMapPage');
    this.getAddress(this.lnglatXY);
  }
  // ionViewDidEnter() {
  //
  //   this.getAddress(this.lnglatXY);
  //
  // }
  getAddress(lnglatXY){
    this.map = new AMap.Map(this.map_container.nativeElement, {
      view: new AMap.View2D({//创建地图二维视口
        zoom: 20, //设置地图缩放级别
        rotateEnable: true,
        showBuildingBlock: true,
        center: [this.lnglatXY[0], this.lnglatXY[1]]
        // position: new AMap.LngLat(this.lnglatXY[0], this.lnglatXY[1]),
      })
    });
    let lnglat=lnglatXY;
    let geocoder = new AMap.Geocoder({
      radius: 1000,
      extensions: "all"
    });
    geocoder.getAddress(lnglat,(status, result)=>{
      if (status === 'complete' && result.info === 'OK') {
        this.address = result.regeocode.formattedAddress; //返回地址描述
        // document.getElementById("result").innerHTML = this.address;
        AMapUI.loadUI(['control/BasicControl'], (BasicControl)=> {

          let zoomCtrl1 = new BasicControl.Zoom({
              theme: 'dark'
            }),
            zoomCtrl2 = new BasicControl.Zoom({
              position: 'br',
              showZoomNum: true
            });

          // this.map.addControl(zoomCtrl1);
          this.map.addControl(zoomCtrl2);
        });
        let marker = new AMap.Marker({  //加点
          map: this.map,
          position: lnglatXY
        });
        marker.setTitle(this.address);
        marker.setLabel({//label默认蓝框白底左上角显示，样式className为：amap-marker-label
          offset: new AMap.Pixel(20, 20),//修改label相对于maker的位置
          content: this.address
        });
        this.map.setFitView();
      }
    });
  }
  driving(){

    if(this.ways==1){
      this.ways=0;
      this.getAddress(this.lnglatXY);
    }else {
      //构造路线导航类
      let loading=this.commonProvider.showLoading();
      this.getAddress(this.lnglatXY);
      this.commonProvider.location().then(resp=>{
        this.locationAttr=resp;
        this.localLnglatXY[0]=this.locationAttr.coords.longitude;
        this.localLnglatXY[1]=this.locationAttr.coords.latitude;
        this.ways = 1;
        let driving = new AMap.Driving({
          map: this.map, panel: "panel"
        });
        // 根据起终点经纬度规划驾车导航路线
        driving.search(new AMap.LngLat(this.localLnglatXY[0], this.localLnglatXY[1]), new AMap.LngLat(this.lnglatXY[0], this.lnglatXY[1]));
        loading.dismiss();
      });
    }
  }
  bus(){
    if(this.ways==2){
      this.ways=0;
      this.getAddress(this.lnglatXY);
    }else{
      let loading=this.commonProvider.showLoading();
      this.getAddress(this.lnglatXY);
      this.commonProvider.location().then(resp=>{
        this.locationAttr=resp;
        this.localLnglatXY[0]=this.locationAttr.coords.longitude;
        this.localLnglatXY[1]=this.locationAttr.coords.latitude;
        this.ways=2;
        let transOptions = {
          map: this.map,
          city: '重庆市',
          panel: 'panel1',
          //cityd:'乌鲁木齐',
          policy: AMap.TransferPolicy.LEAST_TIME
        };
        //构造公交换乘类
        let transfer = new AMap.Transfer(transOptions);
        //根据起、终点坐标查询公交换乘路线
        transfer.search(new AMap.LngLat(this.localLnglatXY[0], this.localLnglatXY[1]), new AMap.LngLat(this.lnglatXY[0], this.lnglatXY[1]));
        loading.dismiss();
      });

    }

  }

}
