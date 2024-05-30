
export interface OrderDetails {
  productId: number;
  quantity: number;
}

export interface CreateOrder {
  orderDetails: OrderDetails[];
}


