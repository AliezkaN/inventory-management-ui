import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../../services/services/order.service';
import Chart from 'chart.js/auto';
import { OrderStats } from '../../../../../services/models/orders/order-stats';
import { ProductStat } from '../../../../../services/models/product/product-stat';

@Component({
  selector: 'app-sold-products-dashboard',
  templateUrl: './sold.products.dashboard.component.html',
  styleUrls: ['./sold.products.dashboard.component.scss']
})
export class SoldProductsDashboardComponent implements OnInit {
  chart: Chart | undefined;
  totalQuantity: number = 0;
  month: string = '';

  constructor(private orderService: OrderService) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    this.month = `${year}-${month}`;
  }

  ngOnInit(): void {
    this.updateChart();
  }

  updateChart(): void {
    this.orderService.getStats({ body: { from: this.month, to: this.month } }).subscribe({
      next: (data: OrderStats) => {
        this.renderChart(data);
      },
      error: err => {
        console.error(err);
      }
    });
  }

  renderChart(data: OrderStats): void {
    if (this.chart) {
      this.chart.destroy();
    }

    const labels: string[] = [];
    const quantities: number[] = [];
    let totalQuantity = 0;

    for (const key in data.stats) {
      if (data.stats.hasOwnProperty(key)) {
        const stats = data.stats[key];
        stats.forEach((stat: ProductStat) => {
          labels.push(stat.productName);
          quantities.push(stat.quantitySold);
          totalQuantity += stat.quantitySold;
        });
      }
    }

    this.totalQuantity = totalQuantity;

    this.chart = new Chart('soldProductsChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Quantity Sold',
          data: quantities,
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
}
