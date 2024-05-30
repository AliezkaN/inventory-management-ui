import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersEarningsDashboardComponent } from './orders.earnings.dashboard.component';

describe('OrdersEarningsDashboardComponent', () => {
  let component: OrdersEarningsDashboardComponent;
  let fixture: ComponentFixture<OrdersEarningsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdersEarningsDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrdersEarningsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
