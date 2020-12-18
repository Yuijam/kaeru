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
import { toDateOnly } from '../helpers';

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
    // const ua = navigator.userAgent;
    // const a = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
    //   ua
    // );
    // alert(a);
    this.fetchData();
  }

  fetchData(date: Date | string = new Date()) {
    this.getRecordsGQL
      .watch({
        date: toDateOnly(date),
      })
      .valueChanges.pipe(
        map((res) => res.data.lineRecords),
        map((r) => toLineData(r))
      )
      .subscribe((r) => (this.lineData = r));
  }
}
