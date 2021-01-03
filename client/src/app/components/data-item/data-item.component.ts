import { Component, OnInit, Input } from '@angular/core';
import { TDataItem } from '../../../types';
@Component({
  selector: 'app-data-item',
  templateUrl: './data-item.component.html',
  styleUrls: ['./data-item.component.scss'],
})
export class DataItemComponent implements OnInit {
  @Input() itemData: TDataItem;
  ngOnInit(): void {}
}
