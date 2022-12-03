export type spec = {
  key: string
  value: any
}

export interface IProduct {
  _id: string
  brand: string
  category: string[]
  description: string
  discount: number
  price: number
  productName: string
  productThumbnail: string
  status: number
  rating: number
  ram: string
  cpu: string
  screen: string
  specs: spec[]
  subCategory: string[]
}
