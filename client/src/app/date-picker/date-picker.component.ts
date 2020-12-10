import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startDate } from 'shared/config';
import { isAfter } from 'shared/lib/dateFns';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent {
  date = new FormControl(new Date(2020, 11, 15));

  constructor() {}
  myFilter = (d: Date | null): boolean => {
    // const day = (d || new Date()).getDay();
    // // Prevent Saturday and Sunday from being selected.
    // return day !== 0 && day !== 6;
    return isAfter(d, startDate);
  };
}
