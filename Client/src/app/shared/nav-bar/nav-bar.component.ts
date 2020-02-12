import { AppRoutes } from '../../routesAndUrls';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ShoppingCardService } from '../../services/shopping-card.service';
import { RealtimeService } from '../../services/realtime.service';
import { events } from 'src/app/socket-event-list';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  routes = AppRoutes;
  itemsCount = 0;

  constructor(
    public auth: AuthService,
    private shoppingCardService: ShoppingCardService) {
    this.shoppingCardService.LoadShoppingBasket().toPromise();
  }

  ngOnInit(): void {
    this.shoppingCardService.GetCard().subscribe(shoppingCard => {
      this.itemsCount = 0;
      console.log("TCL: NavBarComponent -> shoppingCard", shoppingCard)
      if (!shoppingCard) this.itemsCount = 0;
      let result = shoppingCard['items'];
      result.forEach(item => {
        this.itemsCount += item.quantity
      });
      //   this.itemsCount = result[0] ? result[0].quantity : 0;
    });
  }

}
