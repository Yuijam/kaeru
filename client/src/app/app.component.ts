import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
const GET_RECORDS = gql`
  {
    records {
      id
      msgId
      createdAt
    }
  }
`;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'kaieru';

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    console.log('on init');
    this.apollo
      .watchQuery({
        query: GET_RECORDS,
      })
      .valueChanges.pipe(map((res) => res))
      .subscribe(console.log);
  }
}
