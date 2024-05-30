import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {TokenService} from "../../services/token/token.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {
  }

  ngOnInit(): void {
    const roles = this.tokenService.userRoles;
    if (roles.includes('ADMIN')) {
      this.router.navigate(['admin']);
    } else if (roles.includes('MANAGER')) {
      this.router.navigate(['manager']);
    }
  }
  logout() {
    localStorage.clear()
    this.router.navigate(['login'])
  }
}
