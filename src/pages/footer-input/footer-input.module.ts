import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FooterInputPage } from './footer-input';
import {EmojiPickerComponentModule} from "../emoji-picker/emoji-picker.module";
import {EmojiProvider} from "../../providers/emoji/emoji";

@NgModule({
  declarations: [
    FooterInputPage,
  ],
  imports: [
    IonicPageModule.forChild(FooterInputPage),
    EmojiPickerComponentModule
  ],
  providers:[

    EmojiProvider,
  ]
})
export class FooterInputPageModule {}
