import { CategoryService } from './../../admin/admin-services/category.service';
import { Category } from './../../model/category';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.css']
})
export class CategoryFilterComponent implements OnInit {

  @Input('category') selectedCategory;
  categories: Category[] = [];
  constructor(categoryService : CategoryService) { 
    categoryService.GetAll().subscribe(m => {
      this.categories = m["data"];  
    })
  }

  ngOnInit() {
  }

}
