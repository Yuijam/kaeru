import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  GetLineRecordsGQL,
  GetLineRecordsQuery,
} from '../../../generated/graphql-types';
import { Observable } from 'rxjs';
import { MatAccordion } from '@angular/material/expansion';
import { toLineData } from '../../../helpers';
import { TLineItemData } from '../../../types';
import { toDateOnly } from '../../../helpers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  records: Observable<GetLineRecordsQuery['lineRecords']>;
  lineData: TLineItemData[];
  constructor(private getRecordsGQL: GetLineRecordsGQL) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData(date: Date | string = new Date()) {
    this.getRecordsGQL
      .watch({
        date: toDateOnly(date),
      })
      .valueChanges.pipe(
        map(({ data }) => data),
        map(({ lineRecords }) => toLineData(lineRecords))
      )
      .subscribe((r) => (this.lineData = r));
  }
}
