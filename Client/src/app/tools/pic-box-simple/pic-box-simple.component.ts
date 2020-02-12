import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCardService } from '../../services/shopping-card.service';
import { ServerRoutes } from '../../routesAndUrls';

@Component({
  selector: 'pic-box-simple',
  templateUrl: './pic-box-simple.component.html',
  styleUrls: ['./pic-box-simple.component.css']
})
export class PicBoxSimpleComponent implements OnInit {
  ngOnInit(): void {
    if (this.product) {
      this.shoppingCardService.GetCard().subscribe(shoppingCard => {
        if (!shoppingCard) this.quantity = 0;
        let result = shoppingCard['items'].filter(m => m._id == this.product._id);
        this.quantity = result[0] ? result[0].quantity : 0;
      });
    }
  }
  quantity = 0;
  @Input('input-product') product;
  @Input('show-add-to-card') showAddToCard = true;
  @Input('enable-add-to-card') enableAddToCard = true;

  BASE_ADDRESS = ServerRoutes.Images.Products;


  constructor(private shoppingCardService: ShoppingCardService) {
    //  this.getQuantity();
  }

  async ModifyQuantity(flag) {
    (await this.shoppingCardService.ModifyQuantity(this.product, flag)).subscribe(n => {
      console.log("TCL: PicBoxSimpleComponent -> ModifyQuantity -> n", n)
      //  this.getQuantity();
    });

  }

  getQuantity() {

  }
}
