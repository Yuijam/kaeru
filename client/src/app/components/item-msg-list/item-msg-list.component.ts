import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item-msg-list',
  templateUrl: './item-msg-list.component.html',
  styleUrls: ['./item-msg-list.component.scss'],
})
export class ItemMsgListComponent {
  @Input() msgList: string[];
}
