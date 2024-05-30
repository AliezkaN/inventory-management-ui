import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../../../services/services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UpdateProduct} from "../../../../../services/models/product/update-product";

@Component({
  selector: 'app-update.product',
  templateUrl: './update.product.component.html',
  styleUrl: './update.product.component.scss'
})
export class UpdateProductComponent {
  productForm!: FormGroup;
  productId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{1,2})?$')]]
    });

    this.loadProduct();
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const updatedProduct = this.productForm.value as UpdateProduct
      this.productService.updateProduct({productId: this.productId, body: updatedProduct}).subscribe(() => {
        this.router.navigate(['/manager/products']);
      });
    }
  }

  loadProduct(): void {
    // (product) => {
    //   this.productForm.patchValue({
    //     name: product.name,
    //     quantity: product.quantity,
    //     price: product.price
    //   }
    this.productService.getProductById(this.productId).subscribe({
        next: (product) => {
          this.productForm.patchValue({
            name: product.name,
            quantity: product.quantity,
            price: product.price
          });
        },
        error: err => {
          this.router.navigate(['/manager/products']);
        }
      }
    )
  }

  navigateBack(): void {
    this.router.navigate(['/manager/products']);
  }
}
