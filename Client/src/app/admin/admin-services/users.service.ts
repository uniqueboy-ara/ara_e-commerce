import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ServerRoutes } from "../../routesAndUrls";

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  GetAllUsers() {
    return this.http.get(ServerRoutes.Users.GENERAL_ROUTE);
  }
}
