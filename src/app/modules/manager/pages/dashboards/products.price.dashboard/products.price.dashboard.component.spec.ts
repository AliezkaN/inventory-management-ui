import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsPriceDashboardComponent } from './products.price.dashboard.component';

describe('ProductsPriceDashboardComponent', () => {
  let component: ProductsPriceDashboardComponent;
  let fixture: ComponentFixture<ProductsPriceDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsPriceDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsPriceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
