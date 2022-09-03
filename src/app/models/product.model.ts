export type spec = {
  key: string;
  value: any;
};

export interface IProduct {
  _id: string;
  brand: string;
  category: string[];
  description: string;
  discount: number;
  price: number;
  productName: string;
  productThumbnail: string;
  status: number;
  rating: number;
  specs: spec[];
  subCategory: string[];
}
