import { Component, Input, OnInit } from '@angular/core';
import { TLineDesData, TPeriodCfg } from '../../types';

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
  totalHours = 20;
  desConfigs: TPeriodCfg[] = [];

  ngOnInit(): void {
    console.log('oninit');
    this.desConfigs = this.lineDesData.map((desData) => {
      const className = desData.statusCd === 'NORMAL' ? 'normal' : 'in-trouble';
      const width = (desData.time / this.totalHours) * this.totalWidth + 'px';
      return { className, width };
    });
  }
}
