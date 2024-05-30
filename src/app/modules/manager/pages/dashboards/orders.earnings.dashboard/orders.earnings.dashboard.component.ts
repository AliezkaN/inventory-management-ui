import {Component, OnInit} from '@angular/core';
import {Chart} from "chart.js";
import {Order} from "../../../../../services/models/orders/order";
import {OrderService} from "../../../../../services/services/order.service";

@Component({
  selector: 'app-orders-earnings-dashboard',
  templateUrl: './orders.earnings.dashboard.component.html',
  styleUrl: './orders.earnings.dashboard.component.scss'
})
export class OrdersEarningsDashboardComponent implements OnInit {

  orders: Order[] = [];
  earningsChart!: Chart;
  totalEarnings: number = 0;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrders().subscribe({
      next: (orders: Order[]) => {
        this.orders = orders;
        this.createEarningsChart();
        this.calculateTotalEarnings();
      },
      error: err => {
        console.error(err);
      }
    });
  }

  private createEarningsChart(): void {
    const earningsByDay: { [key: string]: number } = {};

    this.orders.sort((b, a) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()).forEach(order => {
      const orderDate = new Date(order.orderDate).toISOString().split('T')[0];
      const orderEarnings = parseFloat(order.totalAmount);

      if (earningsByDay[orderDate]) {
        earningsByDay[orderDate] += orderEarnings;
      } else {
        earningsByDay[orderDate] = orderEarnings;
      }
    });

    const labels = Object.keys(earningsByDay);
    const data = Object.values(earningsByDay);

    const ctx = document.getElementById('earningsChart') as HTMLCanvasElement;
    this.earningsChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total Earnings',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  private calculateTotalEarnings(): void {
    this.totalEarnings = this.orders.reduce((sum, order) => sum + parseFloat(order.totalAmount), 0);
  }
}
