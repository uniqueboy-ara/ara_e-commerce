import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { api_result } from '../model/api-result';
import { ServerRoutes } from '../routesAndUrls';
import { events } from '../socket-event-list';
import { RealtimeService } from './realtime.service';

@Injectable()
export class ShoppingCardService {
  constructor(private http: HttpClient, private realTimeService: RealtimeService) { }

  LoadShoppingBasket() {
    var cardId = localStorage.getItem("cardId");
    if (cardId)
      return this.http.get<api_result>(ServerRoutes.ShoppingCard.GENERAL_ROUTE + "/" + cardId)
    return Observable.create();
  }

  private Create() {
    let product = { createDate: new Date().getTime() };
    return this.http.post(ServerRoutes.ShoppingCard.GENERAL_ROUTE, product);
  }

  GetCard() {
    return this.realTimeService.Listen(events.ITEM_ADDED_TO_SHOPPING_CARD);
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
}
