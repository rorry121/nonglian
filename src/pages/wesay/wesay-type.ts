export class WesayType{
  objectId: string;
  owner: User;
  createdAt: string;
  updateAt: string;
  comment: Comment[];
  image: Image;
  type: number;
  description: string;
  touxiang: string;
  username: string;
  geoPoint:GeoPoint
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
