export class Goods{
  objectId: number;
  title: string;
  description: string;
  price: number;
  sales: number;
  hometown: string;
  imgurl: string;
  stock: number;
  carriage: number;
  comment: object;
  tags: string;
  redundance: string;
  danwei: string;
  imgurls: object;
  image: image;
}
export class image{
  __type:"File";
  name: string;
  url: string;
}
