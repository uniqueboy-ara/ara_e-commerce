import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ServerRoutes } from "../routesAndUrls";
import { Observable, BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { ShoppingCard } from "../model/shoppingCard";

@Injectable()
export class ShoppingCardService {
  constructor(private http: HttpClient) {}

  private counter = new BehaviorSubject<number>(0);
  itemsCount = this.counter.asObservable();

  GetItemCount() {
    let c = 0;
    this.GetCard().subscribe(card => {
      if (!card || !card.items) return;
      card.items.forEach(item => (c += item.quantity));
      this.counter.next(c);
    });
  }

  private Create() {
    let product = { createDate: new Date().getTime() };
    return this.http.post(ServerRoutes.ShoppingCard.GENERAL_ROUTE, product);
  }

  GetCard(): Observable<ShoppingCard> {
    var cardId = localStorage.getItem("cardId");
    return this.http
      .get(ServerRoutes.ShoppingCard.GENERAL_ROUTE + "/" + cardId)
      .pipe(map(r => r["data"]));
  }

  private async GetOrCreateCardId() {
    var cardId = localStorage.getItem("cardId");
    if (cardId) return cardId;

    var result = (await this.Create().toPromise())["data"];
    localStorage.setItem("cardId", result._id);
    return result._id;
  }

  private AddOrUpdateProduct(cardId, product, flag) {
    var params = {
      _cardId: cardId,
      _product: product,
      _flag: flag
    };
    return this.http.put(ServerRoutes.ShoppingCard.GENERAL_ROUTE, params);
  }

  async ModifyQuantity(product, flag) {
    var cardId = await this.GetOrCreateCardId();
    return this.AddOrUpdateProduct(cardId, product, flag);
  }

  RemoveItemFromCard(product) {}
}
