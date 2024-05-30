import {ActivatedRouteSnapshot, CanActivateFn, Router} from '@angular/router';
import {TokenService} from "../token/token.service";
import {inject} from "@angular/core";

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);
  const roles = route.data['roles'] as Array<string>;
  if (roles.some(role => tokenService.userRoles.includes(role))) {
    return true;
  } else {
    router.navigate(['home']);
    return false;
  }
};
