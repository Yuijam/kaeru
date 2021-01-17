import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startDate } from '../../../helpers';
import { isAfter, endOfDay } from '../../../helpers';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent {
  @Output() dateChange = new EventEmitter<Date>();
  date = new FormControl({ value: new Date(), disabled: true });

  myFilter = (d: Date | null): boolean =>
    isAfter(d, startDate) && isAfter(endOfDay(new Date()), d);

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.dateChange.emit(event.value);
  }
}
