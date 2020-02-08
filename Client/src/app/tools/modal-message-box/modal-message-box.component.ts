import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'modal-message-box',
  templateUrl: './modal-message-box.component.html',
  styleUrls: ['./modal-message-box.component.css']
})
export class ModalMessageBoxComponent implements OnInit {

  @Input('yes-text') yesText;
  @Input('no-text') noText;
  @Input('body-text') bodyText;
  @Input('header-text') headerText;

  @Output() yesIsClicked = new EventEmitter()
  @Output() noIsClicked = new EventEmitter()
  constructor() { }

  OkClicked() {
    this.yesIsClicked.emit();
  }

  CancelClicked() {
    this.noIsClicked.emit();
  }

  ngOnInit() {
  }

}
