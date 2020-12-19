import { Component, Input, OnInit } from '@angular/core';
import { TLineDesData, TPeriodCfg } from '../../../types';
import { IsSpService } from '../../services/isSp/is-sp.service';

@Component({
  selector: 'app-line-des',
  templateUrl: './line-des.component.html',
  styleUrls: ['./line-des.component.scss'],
})
export class LineDesComponent implements OnInit {
  @Input() lineDesData: TLineDesData;

  // des: TLineDesData = [
  //   {
  //     time: 2,
  //     statusCd: 'NORMAL',
  //   },
  //   {
  //     time: 5,
  //     statusCd: 'IN_TROUBLE',
  //   },
  //   {
  //     time: 2,
  //     statusCd: 'NORMAL',
  //   },
  //   {
  //     time: 7,
  //     statusCd: 'IN_TROUBLE',
  //   },
  // ];
  totalWidth = 300;
  totalMin = 20 * 60;
  desConfigs: TPeriodCfg[] = [];

  constructor(private isSpService: IsSpService) {}

  ngOnInit(): void {
    if (this.isSpService.isSp) {
      this.totalWidth = 200;
    }
    this.desConfigs = this.lineDesData.map((desData) => {
      const className = desData.statusCd === 'NORMAL' ? 'normal' : 'in-trouble';
      const width = (desData.time / this.totalMin) * this.totalWidth + 'px';
      return { className, width };
    });
  }
}
