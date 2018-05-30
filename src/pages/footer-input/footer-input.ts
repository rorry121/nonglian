import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, TextInput} from 'ionic-angular';
import {NativeProvider} from "../../providers/native/native";
import {HttpProvider} from "../../providers/http/http";
import {JpushProvider} from "../../providers/jpush/jpush";


/**
 * Generated class for the FooterInputPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-footer-input',
  templateUrl: 'footer-input.html',
})
export class FooterInputPage {
  _isOpenEmojiPicker = false;
  editorMsg: string = '';
  @ViewChild('chat_input') messageInput: TextInput;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public nativeProvider:NativeProvider,
              public httpProvider:HttpProvider,
              public jpushProvider:JpushProvider


  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FooterInputPage');
  }
  switchEmojiPicker() {
    this._isOpenEmojiPicker = !this._isOpenEmojiPicker;
    if (!this._isOpenEmojiPicker) {
      this.messageInput.setFocus();
    }
  }
  sendMsg(){
    // this.nativeProvider.getLocation().subscribe(data => {
    //   alert(JSON.stringify(data))
    // }, msg => {
    //   alert(JSON.stringify(msg))
    // })
    // let body =[
    //   { name: 'userid', value: 'NBDZLbMOSi' },
    //   { name: 'toUserids', value: 'tdwu3W9CDk' },
    //   { name: 'msgContent', value: this.editorMsg }
    // ];
    // this.httpProvider.commonPost('http://123.207.14.157:3200/jpush',body).subscribe(data => {
    //     console.log('data:',data);
    // });

    this.jpushProvider.ceshi();
  }

}
