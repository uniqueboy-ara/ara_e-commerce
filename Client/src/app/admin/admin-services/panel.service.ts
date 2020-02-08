import { ServerRoutes } from "../../routesAndUrls";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable()
export class PanelService {
  constructor(private http: HttpClient) { }

  GetMenuItems() {
    return this.http.get(ServerRoutes.AdminPanelMenu.ServerAddress);
  }
}
