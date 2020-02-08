import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminCategoryAddComponent } from './admin/admin-category-add/admin-category-add.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AdminProductAddComponent } from './admin/admin-product-add/admin-product-add.component';
import { AdminProductCategoriesComponent } from './admin/admin-product-category/admin-product-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminTagComponent } from './admin/admin-tag/admin-tag.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { productsComponent } from './products/products.component';
import { AppRoutes } from './routesAndUrls';
import { AdminGuard } from './services/admin-guard.service';
import { AuthGuard } from './services/auth-guard.service';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
    imports: [RouterModule.forRoot([
        { path: AppRoutes.Home, component: IndexComponent },
        { path: AppRoutes.products, component: productsComponent },
        { path: AppRoutes.Login, component: LoginComponent },
        { path: AppRoutes.UserProfile, component: UserProfileComponent, canActivate: [AuthGuard] },
        {
            path: AppRoutes.Admin.Panel, component: AdminPanelComponent, canActivate: [AuthGuard, AdminGuard], children: [
                { path: AppRoutes.Admin.UsersList, component: AdminUsersComponent },
                { path: AppRoutes.Admin.productCategories, component: AdminProductCategoriesComponent },
                { path: AppRoutes.Admin.productTags, component: AdminTagComponent },
                { path: AppRoutes.Admin.products, component: AdminProductComponent },
                { path: AppRoutes.Admin.AddProduct, component: AdminProductAddComponent },
                { path: AppRoutes.Admin.EditProduct, component: AdminProductAddComponent },
                { path: AppRoutes.Admin.AddCategory, component: AdminCategoryAddComponent }
            ]
        },
        //    { path: AppRoutes.Error.ErrorPage, component: ErrorPageComponent },
        { path: AppRoutes.Error.AllOthers, redirectTo: AppRoutes.Home + AppRoutes.Error.ErrorPage }
    ])],
    exports: [RouterModule]
})
export class AppRoutingModule { } 