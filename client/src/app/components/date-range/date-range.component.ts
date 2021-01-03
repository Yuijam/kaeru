import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { QueryTroubleCountsArgs } from '../../../generated/graphql-types';
import { toDateOnly, startDate } from '../../../helpers';
import { isAfter, endOfDay } from '../../../helpers';
import { addDays } from 'date-fns';
import { IsSpService } from '../../services/isSp/is-sp.service';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
})
export class DateRangeComponent {
  @Output() dateChange = new EventEmitter<QueryTroubleCountsArgs>();

  constructor(private isSpService: IsSpService) {}

  myFilter = (d: Date | null): boolean =>
    isAfter(d, startDate) && isAfter(endOfDay(new Date()), d);

  defaultStart = addDays(startDate, 1);
  defaultEnd = new Date();

  range = new FormGroup({
    start: new FormControl(this.defaultStart),
    end: new FormControl(this.defaultEnd),
  });

  onDateEndChange(event: MatDatepickerInputEvent<Date>) {
    const { value } = event;
    if (!value) {
      return;
    }

    const { start, end } = this.range.value;
    this.dateChange.emit({
      dateStart: toDateOnly(start),
      dateEnd: toDateOnly(end),
    });
  }

  onReset() {
    this.range.setValue({ start: this.defaultStart, end: this.defaultEnd });
    this.dateChange.emit({
      dateStart: toDateOnly(this.defaultStart),
      dateEnd: toDateOnly(this.defaultEnd),
    });
  }
}
