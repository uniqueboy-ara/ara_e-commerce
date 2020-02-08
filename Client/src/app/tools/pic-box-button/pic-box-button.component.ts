import { Component, OnInit, Input } from '@angular/core';
import { ServerRoutes } from 'src/app/routesAndUrls';

@Component({
  selector: 'pic-box-button',
  templateUrl: './pic-box-button.component.html',
  styleUrls: ['./pic-box-button.component.css']
})
export class PicBoxButtonComponent implements OnInit {

  @Input('input-product') product
  @Input('group-name') groupName
  BASE_ADDRESS = ServerRoutes.Images.Categories;
  constructor() { }

  ngOnInit() {
  }



}
