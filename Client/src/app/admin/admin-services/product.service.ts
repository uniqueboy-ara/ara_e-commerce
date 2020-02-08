import { ServerRoutes } from "../../routesAndUrls";
import { HttpClient } from "@angular/common/http";

import { Injectable } from "@angular/core";
import { api_result } from "src/app/model/api-result";
import { Observable } from "rxjs";

@Injectable()
export class productService {
  constructor(private http: HttpClient) { }

  GetAll(): Observable<api_result> {
    return this.http.get<api_result>(ServerRoutes.Products.GENERAL_ROUTE);
  }

  Insert(product): Observable<api_result> {
    return this.http.post<api_result>(
      ServerRoutes.Products.GENERAL_ROUTE,
      product
    );
  }

  Get(id) {
    console.log("ProductId: " + id);
    return this.http.get(ServerRoutes.Products.GENERAL_ROUTE + "/" + id);
  }

  Update(product, id) {
    return this.http.put(ServerRoutes.Products.GENERAL_ROUTE, { product, id });
  }

  Delete(id) {
    return this.http.delete(ServerRoutes.Products.GENERAL_ROUTE + "/" + id);
  }


  GetAllFrom(category) {
    if (category)
      return this.http.get(ServerRoutes.Products.GENERAL_ROUTE, {
        params: {
          category: category
        }
      });
    return this.GetAll();
  }
}
