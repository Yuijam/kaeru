import { Component, OnInit } from '@angular/core';
import {
  GetTroubleCountsGQL,
  GetTroubleCountsQuery,
  QueryTroubleCountsArgs,
} from '../../../generated/graphql-types';
import { map } from 'rxjs/operators';
import { startDate, toDateOnly } from '../../../helpers';
import { IsSpService } from '../../services/isSp/is-sp.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit {
  troubleCounts: GetTroubleCountsQuery['troubleCounts'];
  _listTitle: string;

  constructor(
    private getTroubleCountsGQL: GetTroubleCountsGQL,
    public isSpService: IsSpService
  ) {}

  ngOnInit(): void {
    this.listTitle = this.toListTitle(
      toDateOnly(startDate),
      toDateOnly(new Date())
    );
    this.fetchTroubleCounts(toDateOnly(startDate), toDateOnly(new Date()));
  }

  get listTitle() {
    return this._listTitle;
  }

  set listTitle(title: string) {
    this._listTitle = title;
  }

  toListTitle(dateStart: string, dateEnd: string) {
    return `${dateStart} ~ ${dateEnd} 遅延が発生した日数`;
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
    this.listTitle = this.toListTitle(dateStart, dateEnd);
    this.fetchTroubleCounts(dateStart, dateEnd);
  }
}
