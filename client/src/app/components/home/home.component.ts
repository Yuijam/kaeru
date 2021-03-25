import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  GetLineRecordsGQL,
  GetLineRecordsQuery,
} from '../../../generated/graphql-types';
import { Observable } from 'rxjs';
import { MatAccordion } from '@angular/material/expansion';
import {
  toLineData,
  nowStr,
  startHourText,
  toDateOnly,
  formatPattern,
  toDateStr,
  endHourText,
  startHour,
} from '../../../helpers';
import { TLineItemData } from '../../../types';
import { isToday, getHours } from 'date-fns';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  records: Observable<GetLineRecordsQuery['lineRecords']>;
  lineData: TLineItemData[];
  timeText = '';
  constructor(private getRecordsGQL: GetLineRecordsGQL) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData(date: Date | string = new Date()) {
    this.handleTimeText(date);
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

  handleTimeText(date: Date | string = new Date()) {
    const dateStr = toDateStr(date, formatPattern._yyyyMMdd);
    if (isToday(new Date(date))) {
      const h = getHours(new Date());
      this.timeText =
        h < startHour
          ? `お休み中です~~ (¦3[▓▓] `
          : `${dateStr} ${startHourText} ~ ${nowStr(
              formatPattern.HHmm
            )} 運行状況`;
    } else {
      this.timeText = `${dateStr} ${startHourText} ~ ${endHourText} 運行状況`;
    }
  }
}
