import { Injectable } from '@angular/core';
import {Http,Headers,Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppConfig} from "../AppConfig";
import {FileTransferObject, FileTransfer, FileUploadOptions} from "@ionic-native/file-transfer";
import {Observable} from "rxjs";
import {CommonProvider} from "../common/common";
import {AlertController} from "ionic-angular";
import {NativeProvider} from "../native/native";

/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {
  currentVersion: string;
  newVersion:string;
  private ServiceUrl: string = AppConfig.ServiceUrl;
  private XParseMasterKey: string = AppConfig.XParseMasterKey;
  private XParseApplicationId: string = AppConfig.XParseApplicationId;
  private addHeader = new Headers();
  constructor(public http: Http,
              public alertCtrl:AlertController,
              private transfer: FileTransfer,
              public commonProvider:CommonProvider,
              private nativeProvider:NativeProvider
  ) {

    this.addHeader.append("X-Parse-Application-Id", this.XParseApplicationId);
    this.addHeader.append("X-Parse-Master-Key", this.XParseMasterKey);
    this.addHeader.append("Content-Type", "application/json");
  }

  /**
   * get请求-
   * @param url
   */
  get(url: string) {

    return this.http.get(`${this.ServiceUrl}/${url}`, {headers: this.addHeader}).map(res => {
      let result = res.json();
      return result;
    }).catch(this.handleError);
  }

  /**
   * 登录
   * @param 表单f
   */

  login(f):Observable<any> {
    let url = this.ServiceUrl + "/login?username=" + f.username + "&password=" + f.password;
    url = encodeURI(url);

    let data=this.http.get(url, {headers: this.addHeader}).map(res=>
        res.json()
    );
    return data.catch(this.handleError);
  }
  /**
   * 注册-
   * @param obj表单
   */

  signup(obj): Observable<any> {
    let url = this.ServiceUrl+'/users/';
    console.log('obj',obj);
    return this.http.post(url,obj,{headers: this.addHeader})
      .map(res=>res.json())
      .catch(this.handleError);
  }
  /**
   * post请求-
   * @param url
   * @param body
   */
  post(url: string,body) {

    return this.http.post(`${this.ServiceUrl}/${url}`,body, {headers: this.addHeader}).map(res => {
      let result = res.json();
      return result;
    }).catch(this.handleError);;
  }
  /**
   * post请求-
   * @param url
   * @param body
   */
  delete(classes,objectId) {
    let url = 'classes/'+classes+'/'+objectId
    return this.http.delete(`${this.ServiceUrl}/${url}`, {headers: this.addHeader}).map(res => {
      let result = res.json();
      return result;
    }).catch(this.handleError);
  }
  /**
   * put请求-
   * @param url
   * @param body
   */
  put(url: string,body) {

    return this.http.put(`${this.ServiceUrl}/${url}`,body, {headers: this.addHeader}).map(res => {
      let result = res.json();
      return result;
    }).catch(this.handleError);;
  }

  /**
   * 上传文件
   * @param url
   */
  uploadFile(imageBase64,fileName):Promise<any>{
    let uploadUrl=this.ServiceUrl+'/files/'+fileName+'.jpg';
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      headers: this.addHeader
    }
    return new Promise((resolve) => {
      fileTransfer.upload(imageBase64, uploadUrl, options)
        .then((data) => {
          resolve(data);
          // console.log("....data:", data);
          // this.res1 = data.response;
          // console.log("....this.res1:", this.res1);
          // this.res2 = JSON.parse(this.res1);
          // console.log("....this.res2:", this.res2);
          // this.objpicname = this.res2.name;
        }, (err) => {
          console.log('上传文件出错：', err);
        });
    });

  }

  havewesay(objectId,txtname,type,description,geoPoint,address):Observable<Response>{
      let url = '/classes/wesay/'
      let body ={
        "image": {
          "name": txtname,
          "url:": this.ServiceUrl+"/linker/"+txtname,
          "__type": "File"
        },
        "owner": {
          "__type": "Pointer",
          "className": "_User",
          "objectId": objectId
        },
        "type": parseInt(type),
        "description":description,
        "geoPoint":geoPoint,
        "address":address
      };
      console.log(body);
      return this.post(url,body).catch(this.handleError);
  }

  /**
   * 获取关系-
   * @param url   /classes/Goods
   * @param className    _User
   * @param className对应的objectId
   * @param key           likeGoods
   * @param empty为true时，返回数量
   */
  getRelation(url,className,objectId,key,empty:boolean):Observable<any>{
    let option='';
    if(empty){
      option= '&count=1&limit=0';
    }
    let combinedUrl=url+'?where={"$relatedTo":{"object":{"__type":"Pointer","className":"'+className+'","objectId":"'+objectId+'"},"key":"'+key+'"}}'+option;
    return this.get(combinedUrl).catch(this.handleError);
  }
  /**
   * 关系操作-
   * @param url   /classes/Goods
   * @param className    _User
   * @param className对应的objectId
   * @param key           likeGoods
   * @param empty为true时，返回数量
   */


  relationOp(url,mainObjId,relationKey,add,className,objectId){
    let op='AddRelation';
    if(!add){
      op='RemoveRelation';
    }
    let combineUrl=url+'/'+mainObjId;
    let body={};
    body[relationKey]=
        { "__op":op,
          "objects":[
            {"__type":"Pointer",
              "className":className,
              "objectId":objectId
            }
            ]
        };
    return this.put(combineUrl,body).catch(this.handleError);
  }
  /**
   * 上传头像
   * @param url
   */
  setpic(objectId,txtname,goodstype,fileobjname):Observable<Response>{
    let url = this.ServiceUrl+"/"+goodstype+"/"+objectId;
    let obj=fileobjname;
    let body=
      {
        [obj]: {
          "name": txtname, "url:": this.ServiceUrl+'/linker/'+ txtname, "__type": "File"
        }
      }

    return this.http.put(url,body,{headers: this.addHeader})
      .catch(this.handleError);
  }

  /**
   * 删除文件
   * @param url
   */
  deletefiles(name:string):Observable<Response> {
    let url =  this.ServiceUrl+"/files/"+name
    return this.http.delete(url,{headers: this.addHeader})
      .map(res=>res.json())
      .catch(this.handleError);
  }

  /**
   * 获取用户信息
   * @param url
   */
  getuser(objectId: string): Observable<any> {
    let url = this.ServiceUrl+"/users/"+objectId;
    return this.http.get(url, {headers: this.addHeader}).map(res=>res.json())
      .catch(this.handleError);
  }

   handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      // errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      errMsg=err;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }
  isHaveListOfUser(classes,goodsObjId):Observable<any>{
    let userObjId =this.commonProvider.getLocalUserId();
    let url = '/classes/'+classes
    let body ={
      "goods": {
        "__type": "Pointer",
        "className": "Goods",
        "objectId": goodsObjId
      },
      "user": {
        "__type": "Pointer",
        "className": "_User",
        "objectId": userObjId
      }
    };
    url=url+'?where='+JSON.stringify(body);
    return this.get(url).catch(this.handleError);
  }
  addCartList(goodsObjId,userObjId,num):Observable<Response>{
    let url = '/classes/CartList/'
    let body ={
      "goods": {
        "__type": "Pointer",
        "className": "Goods",
        "objectId": goodsObjId
      },
      "user": {
        "__type": "Pointer",
        "className": "_User",
        "objectId": userObjId
      },
      "num":{
        "__op":"Increment",
        "amount":num}
    };
    console.log(body);
    return this.post(url,body).catch(this.handleError);
  }
  addCartListNum(cartListObjId,num):Observable<any>{
    let url = 'classes/CartList/'+cartListObjId
    let body ={
      "num":{
        "__op":"Increment",
        "amount":num}
    };
    console.log(body);
    return this.put(url,body).catch(this.handleError);
  }
  updateCartListNum(cartListObjId,num):Observable<any>{
    let url = 'classes/CartList/'+cartListObjId
    let body ={
      "num":parseFloat(num)
    };
    return this.put(url,body).catch(this.handleError);
  }
  getListOfUser(classes,order,addParams?):Observable<any>{
    let userId=this.commonProvider.getLocalUserId();
    // addParams="&include=goods"
    let body={
      "user": {
        "__type": "Pointer",
        "className": "_User",
        "objectId":userId
      }
    };
    let url='classes/'+classes+'?where='+JSON.stringify(body)+'&order='+order+addParams;
    return this.get(url).catch(this.handleError);
  }
  /**
   * 检查app是否需要升级
   */
  detectionUpgrade(): void {
    //这里连接后台判断是否需要升级,不需要升级就return
    this.checkversion().subscribe(data=>{
      this.newVersion=data.params.version;
      this.commonProvider.getVersionNumber().then(version=>{this.currentVersion=version;
        console.log("this.currentversion:",this.currentVersion);
        console.log("this.newversion:",this.newVersion);
        if(this.currentVersion!=this.newVersion){
          this.alertCtrl.create({
            title: '升级',
            subTitle: '发现新版本,是否立即升级？',
            buttons: [{text: '取消'},
              {
                text: '确定',
                handler: () => {
                  this.nativeProvider.downloadApp();
                }
              }
            ]
          }).present();
        }})
    })}
  checkversion(): Observable<any> {
    let url = "config"
    return this.get(url).catch(this.handleError);
  }
}
