import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { CategoryService } from "./../admin/admin-services/category.service";

@Component({
  selector: "index",
  templateUrl: "./index.component.html",
  styleUrls: ["./index.component.css"]
})
export class IndexComponent implements OnInit {
  selectedCategory: string;
  category_products;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {
    this.categoryService.GetAll().subscribe(m => {
      this.category_products = m.data;

      route.queryParamMap.subscribe(r => {
        this.selectedCategory = r.get("category");
      });
    });
  }

  ngOnInit() {}

  ShowMessage() {
    window.alert("Salam");
    //this.toastr.success('Damet Garm!', 'Hi!');
  }
}
