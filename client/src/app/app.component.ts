import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  GetLineRecordsGQL,
  GetLineRecordsQuery,
} from '../generated/graphql-types';
import { Observable } from 'rxjs';
import { MatAccordion } from '@angular/material/expansion';
import { toLineData } from '../helpers';
import { TLineItemData } from '../types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  records: Observable<GetLineRecordsQuery['lineRecords']>;
  lineData: TLineItemData[];
  constructor(private getRecordsGQL: GetLineRecordsGQL) {}

  ngOnInit() {
    console.log('on init');
    this.getRecordsGQL
      .watch()
      .valueChanges.pipe(
        map((res) => res.data.lineRecords),
        map((r) => toLineData(r))
      )
      .subscribe((r) => (this.lineData = r));
  }
}
