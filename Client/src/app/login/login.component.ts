import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { AppRoutes } from "../routesAndUrls";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  userOrPassIsInvalid = false;
  constructor(
    private auth: AuthService,
    private rout: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {}
  Login(credential) {
    this.auth.login(credential).subscribe(
      res => {
        var token = res["token"];
        localStorage.setItem("token", token);
        this.userOrPassIsInvalid = false;
        let url = this.rout.snapshot.queryParamMap.get("returnUrl");
        this.router.navigate([url || "/" + AppRoutes.Home]);
      },
      err => {
        console.log(err.statusText);
        this.userOrPassIsInvalid = true;
      }
    );
  }
}
