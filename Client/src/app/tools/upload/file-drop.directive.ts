import {
  Directive,
  EventEmitter,
  HostListener,
  Output,
  ElementRef
} from "@angular/core";

@Directive({
  selector: "[fileDrop]"
})
export class FileDropDirective {
  @Output() filesDropped = new EventEmitter<FileList>();
  @Output() filesHovered = new EventEmitter<boolean>();
  _el: ElementRef;
  constructor(el: ElementRef) {
    this._el = el;
  }

  @HostListener("drop", ["$event"])
  onDrop($event) {
    $event.preventDefault();

    let transfer = $event.dataTransfer;
    this.filesDropped.emit(transfer.files);
    this._el.nativeElement.style.backgroundColor = "white";
  }

  @HostListener("dragover", ["$event"])
  onDragOver($event) {
    event.preventDefault();
    this._el.nativeElement.style.backgroundColor = "lightgray";
  }

  @HostListener("dragleave", ["$event"])
  onDragLeave($event) {
    this._el.nativeElement.style.backgroundColor = "white";
  }
}
