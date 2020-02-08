import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "../app-routing.module";
import { PicBoxComponent } from "../tools/pic-box/pic-box.component";
import { SharedModule } from "../tools/shared.module";
import { ModalMessageBoxComponent } from "./../tools/modal-message-box/modal-message-box.component";
import { AdminArtistsComponent } from "./admin-artists/admin-artists.component";
import { AdminCategoryAddComponent } from "./admin-category-add/admin-category-add.component";
import { AdminPanelComponent } from "./admin-panel/admin-panel.component";
import { AdminProductAddComponent } from "./admin-product-add/admin-product-add.component";
import { AdminProductCategoriesComponent } from "./admin-product-category/admin-product-category.component";
import { AdminProductComponent } from "./admin-product/admin-product.component";
import { CategoryService } from "./admin-services/category.service";
import { PanelService } from "./admin-services/panel.service";
import { productService } from "./admin-services/product.service";
import { UsersService } from "./admin-services/users.service";
import { AdminTagComponent } from "./admin-tag/admin-tag.component";
import { AdminUsersComponent } from "./admin-users/admin-users.component";

@NgModule({
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AdminArtistsComponent,
    AdminUsersComponent,
    AdminPanelComponent,
    AdminProductCategoriesComponent,
    AdminTagComponent,
    AdminProductComponent,
    AdminProductAddComponent,
    AdminCategoryAddComponent,
    PicBoxComponent,
    ModalMessageBoxComponent
  ],
  providers: [UsersService, PanelService, CategoryService, productService]
})
export class AdminModule {}
