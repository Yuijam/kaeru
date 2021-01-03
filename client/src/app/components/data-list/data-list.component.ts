import { Component, Input } from '@angular/core';
import { TDataItem } from '../../../types';
import { IsSpService } from '../../services/isSp/is-sp.service';
import { GetTroubleCountsQuery } from '../../../generated/graphql-types';

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.scss'],
})
export class DataListComponent {
  @Input() troubleCounts: GetTroubleCountsQuery['troubleCounts'];

  constructor(private isSpService: IsSpService) {}

  get colorWidth() {
    return this.isSpService ? 200 : 300;
  }

  get listData(): TDataItem[] {
    return this.parseTroubleCounts(this.troubleCounts);
  }

  parseTroubleCounts(
    troubleCounts: GetTroubleCountsQuery['troubleCounts']
  ): TDataItem[] {
    if (!troubleCounts) {
      return [];
    }
    if (!troubleCounts.length) {
      return [];
    }

    const counts = troubleCounts.map(({ count }) => count);
    const maxCount = Math.max(...counts);
    return troubleCounts
      .slice()
      .sort((a, b) => b.count - a.count)
      .map(({ lineName, count }) => {
        const width = this.getColorWidth(maxCount, count);
        return { name: lineName, colorWidth: `${width}px`, value: count };
      });
  }

  getColorWidth(maxCount: number, count: number) {
    return maxCount === 0 ? 0 : (count / maxCount) * this.colorWidth;
  }
}
