import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startDate } from '../../helpers';
import { isAfter } from '../../helpers';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent {
  @Output() dateChange = new EventEmitter<Date>();
  date = new FormControl(new Date());

  myFilter = (d: Date | null): boolean => isAfter(d, startDate);

  onDataChange(event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
    this.dateChange.emit(event.value);
  }
}
