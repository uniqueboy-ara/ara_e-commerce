import { CategoryService } from './../admin-services/category.service';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../model/category';
import { Location } from '@angular/common';
import { ServerRoutes } from '../../routesAndUrls';

@Component({
  selector: 'app-admin-category-add',
  templateUrl: './admin-category-add.component.html',
  styleUrls: ['./admin-category-add.component.css']
})
export class AdminCategoryAddComponent implements OnInit {


  BASE_ADDRESS = ServerRoutes.Images.Categories;
  constructor(private categoryService: CategoryService, private location: Location) { }
  category: Category = { name: '', description: '', fileName: '', isVisible: true };
  ngOnInit() {
  }
  OnBack() {
    this.location.back();
  }

  async Save(category: Category) {
    await this.categoryService.Insert(category).toPromise();
    this.location.back();
  }

  SetFilePath(path) {
    console.log("TCL: AdminProductAddComponent -> SetFilePath -> path", path)
    this.category.fileName = path;
  }
}
