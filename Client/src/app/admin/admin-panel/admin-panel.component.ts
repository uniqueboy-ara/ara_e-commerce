import { map } from "rxjs/operators";

import { PlatformLocation } from "@angular/common";
import { Component, OnInit, AfterContentChecked } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { AppRoutes } from "../../routesAndUrls";
import { PanelService } from "./../admin-services/panel.service";

@Component({
  selector: "admin-panel",
  templateUrl: "./admin-panel.component.html",
  styleUrls: ["./admin-panel.component.css"]
})
export class AdminPanelComponent implements OnInit, AfterContentChecked {
  ngAfterContentChecked(): void {
    if (this.router.url == "/admin") {
      this.showPanel = true;
      this.selectedItem = "";
    } else this.showPanel = false;
  }
  menuItems;
  showPanel: boolean = false;
  selectedItem: string = "";
  ngOnInit(): void {
    this.panelService.GetMenuItems().subscribe(res => {
      this.menuItems = res["data"];
      console.log("TCL: AdminPanelComponent -> menuItems", this.menuItems);
    });
  }
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private location: PlatformLocation,
    private panelService: PanelService
  ) {
    location.onPopState(() => {
      this.selectedItem = this.GetSelectedItem();
      console.log(this.selectedItem);
    });

    if (activeRoute.firstChild)
      activeRoute.firstChild.url.subscribe(m => {
        this.selectedItem = m.toString();
        console.log("Currenct child: " + m);
      });

    // this.showPanel = this.selectedItem != '';
  }

  ChangeTab(item) {
    console.log("Title: " + item.title);
    this.selectedItem = item.title;
    this.GoTo(item.rout);
  }

  GoTo(state) {
    this.router.navigate(["/" + AppRoutes.Admin.Panel + "/" + state]);
  }

  GetSelectedItem() {
    var currentPath = this.location.pathname;
    var path = currentPath.split("/");
    var item = this.menuItems.find(m => m.rout == path[path.length - 1]);
    return item ? item.title : "";
  }
}
