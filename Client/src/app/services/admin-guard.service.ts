import { AppRoutes } from "../routesAndUrls";
import { CanActivate, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate() {
    if (this.auth.currentUser.isAdmin) return true;
    else {
      this.router.navigate(["/" + AppRoutes.Home]);
      return false;
    }
  }
}
