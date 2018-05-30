import { Component, Input } from '@angular/core';

@Component({
  selector: 'img-lazy-load',
  templateUrl: 'img-lazy-load.html'
})
export class ImgLazyLoadComponent {

  default: string = 'assets/img/timg.jpg';

  constructor() {
  }

  @Input() src: string //要显示的图片
  @Input() type: string //要显示的图片
  ngOnInit() {
    if(this.type=='1'){
      this.default='assets/img/logo.png'
    }
    let img = new Image();
    img.src = this.src;
    img.onload = () => {
      //这里为了达到演示效果给了两秒的延迟，实际使用中不需要延迟
        this.default = this.src;
        if(img.width>img.height){
          img.width=window.screen.width*0.68;
          // document.getElementsByClassName('onlyone')[0].style.minWidth='60%';
          console.log(img.width)

        }
      if(img.height>img.width){
        img.width=window.screen.width*0.33;
        // document.getElementsByClassName('onlyone')[0].style.minWidth='60%';
        console.log(img.width)
      }

    }
  }
}
