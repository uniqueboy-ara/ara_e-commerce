import { Component, Input } from '@angular/core';
import { ShoppingCardService } from '../../services/shopping-card.service';
import { ServerRoutes } from '../../routesAndUrls';

@Component({
  selector: 'pic-box-simple',
  templateUrl: './pic-box-simple.component.html',
  styleUrls: ['./pic-box-simple.component.css']
})
export class PicBoxSimpleComponent {
  quantity = 0;
  @Input('input-product') product;
  @Input('show-add-to-card') showAddToCard = true;
  @Input('enable-add-to-card') enableAddToCard = true;

  BASE_ADDRESS = ServerRoutes.Images.Products;


  constructor(private shoppingCardService: ShoppingCardService) {
    this.getQuantity();
  }

  async ModifyQuantity(flag) {
    (await this.shoppingCardService.ModifyQuantity(this.product, flag)).subscribe(n => {
      this.getQuantity();
      this.shoppingCardService.GetItemCount();
    });

    if (this.quantity == 0) {
      this.shoppingCardService.RemoveItemFromCard(this.product);
    }
  }

  getQuantity() {
    this.shoppingCardService.GetCard().subscribe(shippingCard => {
      if (!shippingCard) this.quantity = 0;
      let result = shippingCard.items.filter(m => m._id == this.product._id);
      this.quantity = result[0] ? result[0].quantity : 0;
    });
  }
}
