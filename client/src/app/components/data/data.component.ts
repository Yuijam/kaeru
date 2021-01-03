import { Component, OnInit } from '@angular/core';
import {
  GetTroubleCountsGQL,
  GetTroubleCountsQuery,
  QueryTroubleCountsArgs,
} from '../../../generated/graphql-types';
import { map, tap } from 'rxjs/operators';
import { startDate, toDateOnly } from '../../../helpers';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit {
  troubleCounts: GetTroubleCountsQuery['troubleCounts'];

  constructor(private getTroubleCountsGQL: GetTroubleCountsGQL) {}

  ngOnInit(): void {
    this.fetchTroubleCounts(toDateOnly(startDate), toDateOnly(new Date()));
  }

  fetchTroubleCounts(dateStart: string, dateEnd: string) {
    this.getTroubleCountsGQL
      .watch({
        dateStart,
        dateEnd,
      })
      .valueChanges.pipe(map(({ data }) => data))
      .subscribe(({ troubleCounts }) => {
        this.troubleCounts = troubleCounts;
      });
  }

  onDateChange(event: QueryTroubleCountsArgs) {
    const { dateStart, dateEnd } = event;
    this.fetchTroubleCounts(dateStart, dateEnd);
  }
}
