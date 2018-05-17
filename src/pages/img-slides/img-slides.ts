import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ImgSlidesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-img-slides',
  templateUrl: 'img-slides.html',
})
export class ImgSlidesPage {
  imgUrls=[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.imgUrls=this.navParams.get('imgUrls');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImgSlidesPage');
  }
  goToPop(){
    this.navCtrl.pop();
  }

}
