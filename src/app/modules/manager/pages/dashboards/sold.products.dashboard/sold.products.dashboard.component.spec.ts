import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldProductsDashboardComponent } from './sold.products.dashboard.component';

describe('SoldProductsDashboardComponent', () => {
  let component: SoldProductsDashboardComponent;
  let fixture: ComponentFixture<SoldProductsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SoldProductsDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SoldProductsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
