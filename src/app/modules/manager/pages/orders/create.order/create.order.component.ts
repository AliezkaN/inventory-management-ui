import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {ProductService} from '../../../../../services/services/product.service';
import {Product} from '../../../../../services/models/product/product';
import {Router} from '@angular/router';
import {CreateOrder} from "../../../../../services/models/orders/create-order";
import {OrderService} from "../../../../../services/services/order.service";

@Component({
  selector: 'app-create-order',
  templateUrl: './create.order.component.html',
  styleUrls: ['./create.order.component.scss']
})
export class CreateOrderComponent implements OnInit {
  orderForm: FormGroup;
  products: Product[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private orderService: OrderService,
    private router: Router
  ) {
    this.orderForm = this.fb.group({
      orderDetails: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
        // Add initial product selection if needed
        this.addProduct();
      },
      error: err => {
        console.error(err);
      }
    });
  }

  get orderDetails(): FormArray {
    return this.orderForm.get('orderDetails') as FormArray;
  }

  addProduct(): void {
    this.orderDetails.push(this.fb.group({
      productId: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1), this.quantityValidator()]]
    }));
  }

  removeProduct(index: number): void {
    this.orderDetails.removeAt(index);
  }

  quantityValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const productIdControl = control.parent?.get('productId');
      const quantity = control.value;
      if (productIdControl) {
        const selectedProduct = this.products.find(p => p.id === +productIdControl.value);
        if (selectedProduct && quantity > selectedProduct.quantity) {
          return { maxQuantity: { value: selectedProduct.quantity } };
        }
      }
      return null;
    };
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const createOrder: CreateOrder = this.orderForm.value;
      this.orderService.create({body: createOrder}).subscribe({
        next: resp => {
          this.router.navigate(['manager/orders']);
        },
        error: error => {
          console.error(error);
        }
      })
    }
  }


  getProductMaxQuantity(productId: number): number {
    const product = this.products.find(p => p.id == productId);
    return product ? product.quantity : 0;
  }


  navigateBack(): void {
    this.router.navigate(['manager/orders']);
  }
}
