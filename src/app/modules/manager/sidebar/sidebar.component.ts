import { Component } from '@angular/core';
import {TokenService} from "../../../services/token/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(private router: Router, private tokenService: TokenService) {}
  logout(): void {
    this.tokenService.clearToken();
    this.router.navigate(['/login']);
  }
}
