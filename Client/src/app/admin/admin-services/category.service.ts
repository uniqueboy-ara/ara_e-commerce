import { ServerRoutes } from "../../routesAndUrls";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category } from "../../model/category";
import { Observable } from "rxjs";
import { api_result } from "src/app/model/api-result";

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient) {}

  GetAll(): Observable<api_result> {
    return this.http.get<api_result>(ServerRoutes.Categories.GENERAL_ROUTE);
  }

  Insert(category: Category): Observable<api_result> {
    console.log(category);
    return this.http.post<api_result>(
      ServerRoutes.Categories.GENERAL_ROUTE,
      category
    );
  }
}
