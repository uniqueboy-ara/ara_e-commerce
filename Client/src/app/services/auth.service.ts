import { AppRoutes, ServerRoutes } from "../routesAndUrls";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

const helper = new JwtHelperService();
@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(credential) {
    return this.http.post(ServerRoutes.Login, credential);
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["/" + AppRoutes.Home]);
  }

  isLogedIn() {
    let result = localStorage.getItem("token") != undefined; // helper.isTokenExpired();
    return result;
  }

  get currentUser() {
    let token = localStorage.getItem("token");
    if (this.isLogedIn()) {
      var data = helper.decodeToken(token);
      return data.user;
    }

    return null;
  }
}
