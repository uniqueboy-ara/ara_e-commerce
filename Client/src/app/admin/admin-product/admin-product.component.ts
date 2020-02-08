import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../admin-services/category.service';

import { productService } from './../admin-services/product.service';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../model/category';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent {
  selectedCategory: string;
  productList: any[];
  categories: Category[];
  filteredList: any[];
  constructor(
    private phtoService: productService,
    private categoryService: CategoryService,
    private route: ActivatedRoute) {

    this.phtoService.GetAll().subscribe(m => {
      this.productList = m["data"];
      route.queryParamMap.subscribe(m => {
        this.selectedCategory = m.get('category');
        this.selectedCategory = m.get('category');
      this.filteredList = (this.selectedCategory != null) ?
      this.productList.filter(m => m.category.toLowerCase().includes(this.selectedCategory.toLowerCase())) :
      this.filteredList = this.productList;
      })
    });
    this.categoryService.GetAll().subscribe(m => (this.categories = m["data"]));
  }


  Deleteproduct(value) {
    this.productList = this.productList.filter(m => m._id != value);
    this.phtoService.Delete(value).subscribe(m => console.log(m));
  }

  FilterData(term: string) {
    console.log('Filter: ' + this.selectedCategory)
    if (term != this.selectedCategory) {
      console.log(term);
      this.selectedCategory = term;

      this.filteredList = (term != null) ?
        this.productList.filter(m => m.category.toLowerCase().includes(term.toLowerCase())) :
        this.filteredList = this.productList;
    }
  }

}
