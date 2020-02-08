import { AppRoutes, ServerRoutes } from '../../routesAndUrls';
import { Component, OnInit, ViewContainerRef, OnDestroy } from "@angular/core";
import { Location } from "@angular/common";
import { CategoryService } from "../admin-services/category.service";
import { productService } from "../admin-services/product.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "../../model/product";
import { Category } from "../../model/category";
import { UploadService } from '../../tools/upload/upload.service';

@Component({
  selector: "admin-product-add",
  templateUrl: "./admin-product-add.component.html",
  styleUrls: ["./admin-product-add.component.css"]
})
export class AdminProductAddComponent implements OnInit {
  product: Product = {
    name: "",
    caption: "",
    fileName: "",
    price: 0,
    category: "",
    likeCount: 0,
    isVisible: true,
    discount: 0
  };
  id;
  BASE_ADDRESS = ServerRoutes.Images.Products;
  constructor(
    vcr: ViewContainerRef,
    private uploadService: UploadService,
    private location: Location,
    private categoryService: CategoryService,
    private productService: productService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    this.id = id;
    if (id)
      this.productService
        .Get(id)
        .subscribe(res => (this.product = res["data"]));
  }

  categories: Category[];

  ngOnInit() {
    this.categoryService.GetAll().subscribe(m => {
      this.categories = m.data;
    });
  }

  OnBack() {
    this.DeleteImage();
    this.location.back();
  }

  async DeleteImage() {
    if (this.product.fileName) {
      await this.uploadService.Delete(this.product.fileName, 'prod').toPromise();
      this.product.fileName = ''
    }
  }

  async Save(_product) {
    if (this.id) {
      // Edit Mode
      this.productService.Update(_product, this.id).subscribe(m => {
        if (m["result"]) {
          this.router.navigate([
            AppRoutes.Admin.Panel + "/" + AppRoutes.Admin.products
          ]);
        } else {
          //  this.toastr.error("Product Editing Failed!", "Fail!");
        }
      });
    } else {
      // Add Mode
      this.productService.Insert(_product).subscribe(m => {
        if (m.result) {
          console.log("added");
          this.router.navigate([
            AppRoutes.Admin.Panel + "/" + AppRoutes.Admin.products
          ]);
        } else {
          //   this.toastr.error("Product Adding Failed!", "Fail!");
        }
      });
    }
  }

  SetFilePath(path) {
    console.log("TCL: AdminProductAddComponent -> SetFilePath -> path", path)
    this.product.fileName = path;
  }
}
