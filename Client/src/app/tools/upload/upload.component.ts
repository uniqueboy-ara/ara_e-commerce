import { Component, Input, Output, EventEmitter } from "@angular/core";

import * as _ from "lodash";
import { UploadService } from "./upload.service";

@Component({
  selector: "upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.css"],
  providers: [UploadService]
})
export class UploadComponent {
  @Input() autoUpload: boolean = false;
  @Input() directory: string = '';
  @Output() onFileUploaded: EventEmitter<string> = new EventEmitter<string>();
  filesToUpload: File[] = [];
  constructor(private upSvc: UploadService) { }

  handleDrop(fileList: FileList) {
    this.filesToUpload = [];

    let filesIndex = _.range(fileList.length);

    _.each(filesIndex, idx => {
      this.filesToUpload.push(fileList[idx]);
    });
    this.Upload();
  }

  Upload() {
    this.upSvc.Upload(this.filesToUpload, this.directory).subscribe(m => {
      if (m.result) {
        this.filesToUpload = [];
        this.onFileUploaded.emit(m.data[0]);
      }
      console.log(m);
    });
  }
}
