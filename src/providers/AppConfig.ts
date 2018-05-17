export class AppConfig {
  static ServiceUrl: string = "http://123.207.14.157:1337/parse";
  static XParseApplicationId: string='linker';
  static XParseMasterKey: string='linker121';
  static ApkDownloadUrl = 'http://119.28.143.76/download/nonglian.apk';//apk下载完整地址
  /**
   * 获取设备高度
   */
  static get getWindowHeight(): number {
    return window.screen.height;
  }
  /**
   * 获取设备宽度
   */
  static get getWindowWidth(): number {
    return window.screen.width;
  }
}
