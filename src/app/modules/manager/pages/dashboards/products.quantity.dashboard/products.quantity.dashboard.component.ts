import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../../services/models/product/product';
import { ProductService } from '../../../../../services/services/product.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-products-quantity-dashboard',
  templateUrl: './products.quantity.dashboard.component.html',
  styleUrls: ['./products.quantity.dashboard.component.scss']
})
export class ProductsQuantityDashboardComponent implements OnInit {

  products: Product[] = [];
  quantityChart: Chart | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.renderQuantityChart();
      },
      error: err => {
        console.error(err);
      }
    });
  }

  renderQuantityChart(): void {
    const ctx = document.getElementById('productQuantityChart') as HTMLCanvasElement;
    if (ctx) {
      this.quantityChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.products.map(p => p.name),
          datasets: [{
            label: 'Products Quantity',
            data: this.products.map(p => p.quantity),
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


}
