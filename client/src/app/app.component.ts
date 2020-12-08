import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { GetRecordsGQL, GetRecordsQuery } from '../generated/graphql-types';
import { Observable } from 'rxjs';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  panelOpenState = false;

  records: Observable<GetRecordsQuery['records']>;
  constructor(private getRecordsGQL: GetRecordsGQL) {}

  ngOnInit() {
    console.log('on init');
    this.records = this.getRecordsGQL
      .watch()
      .valueChanges.pipe(map((res) => res.data.records));
  }
}
