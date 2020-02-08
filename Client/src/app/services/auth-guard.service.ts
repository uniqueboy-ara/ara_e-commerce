import { AppRoutes } from '../routesAndUrls';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(rout, state: RouterStateSnapshot) {
    if (this.auth.currentUser)
      return true;
    else {
      this.router.navigate(['/' + AppRoutes.Login], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }

  constructor(private auth: AuthService, private router: Router) { }

}
