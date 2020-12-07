import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { GetRecordsGQL, GetRecordsQuery } from '../generated/graphql-types';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'kaieru';

  records: Observable<GetRecordsQuery['records']>;
  constructor(private getRecordsGQL: GetRecordsGQL) {}

  ngOnInit() {
    console.log('on init');
    this.records = this.getRecordsGQL
      .watch()
      .valueChanges.pipe(map((res) => res.data.records));
  }
}
