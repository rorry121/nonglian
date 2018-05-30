export class WesayType{
  objectId: string;
  owner: User;
  createdAt: string;
  updateAt: string;
  imgArray: string[];
  type: number;
  description: string;
  username: string;
  geoPoint:GeoPoint;
  address:string;
}
export class Wesaycommenttype{
  wesay: Wesay;
  initiator: User;
  connent: string;
}
export class User{
  __type:"Pointer";
  className: "_User";
  objectId: string;
  username: string;
  touxiang: Image;
}
export class GeoPoint{
  __type:"Pointer";
  latitude: string;
  longitude: string;
}
export class Wesay{
  __type:"Pointer";
  className: "wesay";
  objectId: string;
}
export class Comment{
  __type:"Pointer";
  className: "wesaycomment";
  objectId: string;
}
export class Image{
  __type:"File";
  name: string;
  url: string;
}
