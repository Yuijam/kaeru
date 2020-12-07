import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { GetRecordsGQL, GetRecordsQuery } from '../generated/graphql-types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'kaieru';

  records: Observable<GetRecordsQuery['records']>;
  constructor(recordGQL: GetRecordsGQL) {
    recordGQL
      .watch()
      .valueChanges.pipe(map((res) => res.data.records))
      .subscribe((res) => console.log(`gql ok!`, res));
  }

  ngOnInit() {
    console.log('on init');
  }
}
