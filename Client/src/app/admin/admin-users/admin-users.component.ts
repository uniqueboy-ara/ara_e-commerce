import { Component, OnInit } from "@angular/core";
import { UsersService } from "../admin-services/users.service";

@Component({
  selector: "admin-users",
  templateUrl: "./admin-users.component.html",
  styleUrls: ["./admin-users.component.css"]
})
export class AdminUsersComponent implements OnInit {
  constructor(private userService: UsersService) {}
  userList;
  items = [];
  itemsCount: number;
  ngOnInit() {
    this.FetchUsers();
  }

  FetchUsers() {
    this.userService.GetAllUsers().subscribe(res => {
      this.userList = res["data"];
    });
  }

  private InitializeTable(data) {}

  Reload(params) {}
}
