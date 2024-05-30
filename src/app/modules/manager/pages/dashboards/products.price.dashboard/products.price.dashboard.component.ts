import {Component, OnInit} from '@angular/core';
import {Product} from "../../../../../services/models/product/product";
import {Chart} from "chart.js";
import {ProductService} from "../../../../../services/services/product.service";

@Component({
  selector: 'app-products-price-dashboard',
  templateUrl: './products.price.dashboard.component.html',
  styleUrl: './products.price.dashboard.component.scss'
})
export class ProductsPriceDashboardComponent implements OnInit{
  products: Product[] = [];
  priceChart: Chart<'pie'>| undefined;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.renderPriceChart();
      },
      error: err => {
        console.error(err);
      }
    });
  }

  renderPriceChart(): void {
    const ctx = document.getElementById('productPriceChart') as HTMLCanvasElement;
    if (ctx) {
      this.priceChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: this.products.map(p => p.name),
          datasets: [{
            label: 'Product Prices',
            data: this.products.map(p => p.price),
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
