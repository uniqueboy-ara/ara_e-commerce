import { Component, OnInit, Input } from '@angular/core';
import { ServerAddress, ServerRoutes } from '../../routesAndUrls';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  BASE_ADDRESS = ServerRoutes.Images.Categories;
  constructor() { }

  @Input() productList = [];
  @Input('group-name') groupName
  ngOnInit() {
  }

}
