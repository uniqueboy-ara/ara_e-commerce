import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { productService } from "../admin/admin-services/product.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class productsComponent implements OnInit {
  selectedCategory: string = "";
  allProducts = [];

  constructor(
    private productService: productService,
    private route: ActivatedRoute
  ) {
    route.queryParamMap.subscribe(r => {
      this.selectedCategory = r.get("category");
      productService.GetAllFrom(this.selectedCategory).subscribe(m => {
        this.allProducts = m["data"];
      });
    });
  }

  ngOnInit() {}
}
