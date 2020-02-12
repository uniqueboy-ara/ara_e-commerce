import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UploadComponent } from "./upload/upload.component";
import { FileDropDirective } from "./upload/file-drop.directive";
import { ProductListComponent } from './product-list/product-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UploadComponent, FileDropDirective, ProductListComponent],
  imports: [CommonModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,],
  exports: [UploadComponent, FileDropDirective, ProductListComponent]
})
export class SharedModule { }
