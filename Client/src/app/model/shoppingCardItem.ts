import {Product} from "./product";

export interface ShoppingCardItem {
  _id: string,
  product: Product,
  quantity: number
}
