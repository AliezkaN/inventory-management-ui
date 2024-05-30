import {Component, OnInit} from '@angular/core';
import {Product} from "../../../../services/models/product/product";
import {ProductService} from "../../../../services/services/product.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  providers: [DatePipe]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService,
              private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products.sort((a, b) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime());
      },
      error: err => {
        console.error(err)
      }
      }
    )
  }

  formatDateTime(dateTime: string): string {
    return this.datePipe.transform(dateTime, 'medium') || ''; // Provide a default value
  }


  deleteProduct(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(() => {
      this.products = this.products.filter(p => p.id !== product.id);
    });
  }
}
