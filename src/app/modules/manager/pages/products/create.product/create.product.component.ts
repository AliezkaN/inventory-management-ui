import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../../../services/services/product.service";
import {Router} from "@angular/router";
import {CreateProduct} from "../../../../../services/models/product/create-product";

@Component({
  selector: 'app-create.product',
  templateUrl: './create.product.component.html',
  styleUrl: './create.product.component.scss'
})
export class CreateProductComponent {
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const newProduct: CreateProduct = this.productForm.value;
      this.productService.createProduct({body: newProduct}).subscribe(() => {
        this.router.navigate(['/manager/products']);
      });
    }
  }

  navigateBack(): void {
    this.router.navigate(['/manager/products']);
  }
}
