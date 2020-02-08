import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServerRoutes } from 'src/app/routesAndUrls';

@Component({
  selector: 'pic-box',
  templateUrl: './pic-box.component.html',
  styleUrls: ['./pic-box.component.css']
})
export class PicBoxComponent implements OnInit {

  @Input('input-product') product
  @Input('edit-link') editLink

  @Output() onDelete = new EventEmitter()
  BASE_ADDRESS = ServerRoutes.Images.Products;
  constructor() { }

  Delete() {
    console.log('Delete command Reveived');
    this.onDelete.emit()
  }
  ngOnInit() {
  }

}
