import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UploadComponent } from "./upload/upload.component";
import { FileDropDirective } from "./upload/file-drop.directive";

@NgModule({
  declarations: [UploadComponent, FileDropDirective],
  imports: [CommonModule],
  exports: [UploadComponent, FileDropDirective]
})
export class SharedModule {}
