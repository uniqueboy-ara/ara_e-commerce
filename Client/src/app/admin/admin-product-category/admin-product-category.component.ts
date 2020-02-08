import { CategoryService } from "./../admin-services/category.service";
import { Component, OnInit } from "@angular/core";
import { AppRoutes, ServerRoutes } from '../../routesAndUrls';

@Component({
  selector: "admin-product-category",
  templateUrl: "./admin-product-category.component.html",
  styleUrls: ["./admin-product-category.component.css"]
})
export class AdminProductCategoriesComponent implements OnInit {
  constructor(private categoryService: CategoryService) {
    categoryService.GetAll().subscribe(m => {
      console.log(m.data);
      this.items = m.data;
    });
  }
  appRoutes = AppRoutes;
  BASE_ADDRESS = ServerRoutes.Images.Categories;
  items = [];
  itemsCount: number;
  ngOnInit() {
    this.FetchUsers();
  }

  FetchUsers() {
    this.categoryService.GetAll().subscribe(res => { });
  }

  Reload(params) { }
}
