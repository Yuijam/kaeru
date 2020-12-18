import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-item-msg-list',
  templateUrl: './item-msg-list.component.html',
  styleUrls: ['./item-msg-list.component.scss'],
})
export class ItemMsgListComponent implements OnInit {
  @Input() msgList: string[];
  constructor() {}

  ngOnInit(): void {}
}
