import {Component} from '@angular/core';
import {ShoppingCardService} from "./services/shopping-card.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[ShoppingCardService]
})
export class AppComponent {


  title = 'app';

}
