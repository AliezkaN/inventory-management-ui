import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrl: './dashboards.component.scss'
})
export class DashboardsComponent {

  selectedDashboard: string = 'products-quantity';

  selectDashboard(dashboard: string) {
    this.selectedDashboard = dashboard;
  }
}
