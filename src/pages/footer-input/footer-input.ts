import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, TextInput} from 'ionic-angular';
import {NativeProvider} from "../../providers/native/native";

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
              public nativeProvider:NativeProvider

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
    this.nativeProvider.getLocation().subscribe(data => {
      alert(JSON.stringify(data))
    }, msg => {
      alert(JSON.stringify(msg))
    })
  }
}
