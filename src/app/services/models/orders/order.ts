import {OrderProduct} from "./order-product";

export interface Order {
  id: number;
  orderProducts: OrderProduct[]
  totalAmount: string
  orderDate: string
}
