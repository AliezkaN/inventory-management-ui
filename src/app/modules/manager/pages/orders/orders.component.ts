import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../../services/services/order.service";
import {Order} from "../../../../services/models/orders/order";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  providers: [DatePipe]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService,
              private datePipe: DatePipe) {
  }

  ngOnInit(): void {
   this.orderService.getOrders().subscribe({
     next: orders => {
       this.orders = orders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
     },
     error: err => {
       console.error(err);
     }
   })
  }

  formatDateTime(dateTime: string): string {
    return this.datePipe.transform(dateTime, 'medium') || ''; // Provide a default value
  }

  deleteOrder(order: Order) {
    this.orderService.deleteOrder(order.id).subscribe(() => {
      this.orders = this.orders.filter(p => p.id !== order.id);
    });
  }
}
