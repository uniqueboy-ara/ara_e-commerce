import {AppRoutes} from '../../routesAndUrls';
import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ShoppingCardService} from "../../services/shopping-card.service";

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  routes = AppRoutes;
  itemsCount = 0;

  constructor(public auth: AuthService, private shoppingCardService: ShoppingCardService) {
    this.shoppingCardService.itemsCount.subscribe(c => this.itemsCount = c);
  }

  ngOnInit(): void {
    this.shoppingCardService.GetItemCount();
  }

}
