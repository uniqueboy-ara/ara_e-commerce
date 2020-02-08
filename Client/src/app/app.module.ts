import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { productService } from "./admin/admin-services/product.service";
import { AdminModule } from "./admin/admin.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { IndexComponent } from "./index/index.component";
import { LoginComponent } from "./login/login.component";
import { productsComponent } from "./products/products.component";
import { AdminGuard } from "./services/admin-guard.service";
import { AuthGuard } from "./services/auth-guard.service";
import { AuthService } from "./services/auth.service";
import { ShoppingCardService } from "./services/shopping-card.service";
import { ErrorPageComponent } from "./shared/error-page/error-page.component";
import { NavBarComponent } from "./shared/nav-bar/nav-bar.component";
import { CategoryFilterComponent } from "./tools/category-filter/category-filter.component";
import { PicBoxButtonComponent } from "./tools/pic-box-button/pic-box-button.component";
import { PicBoxSimpleComponent } from "./tools/pic-box-simple/pic-box-simple.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { SharedModule } from "./tools/shared.module";
import { FileDropDirective } from "./tools/upload/file-drop.directive";

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    NavBarComponent,
    UserProfileComponent,
    ErrorPageComponent,
    PicBoxButtonComponent,
    productsComponent,
    PicBoxSimpleComponent,
    PicBoxSimpleComponent,
    CategoryFilterComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AdminModule,
    SharedModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminGuard,
    productService,
    ShoppingCardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
