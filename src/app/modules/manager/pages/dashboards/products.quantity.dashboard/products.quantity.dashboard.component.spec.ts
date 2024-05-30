import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsQuantityDashboardComponent } from './products.quantity.dashboard.component';

describe('ProductsDashboardComponent', () => {
  let component: ProductsQuantityDashboardComponent;
  let fixture: ComponentFixture<ProductsQuantityDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsQuantityDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsQuantityDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
