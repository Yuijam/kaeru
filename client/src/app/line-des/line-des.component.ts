import { Component, Input, OnInit } from '@angular/core';

type TPeriod = {
  time: number;
  statusCd: string;
};

type TDes = TPeriod[];

@Component({
  selector: 'app-line-des',
  templateUrl: './line-des.component.html',
  styleUrls: ['./line-des.component.scss'],
})
export class LineDesComponent implements OnInit {
  des: TDes = [
    {
      time: 2,
      statusCd: 'NORMAL',
    },
    {
      time: 5,
      statusCd: 'IN_TROUBLE',
    },
    {
      time: 2,
      statusCd: 'NORMAL',
    },
    {
      time: 7,
      statusCd: 'IN_TROUBLE',
    },
  ];
  totalWidth = 300;
  totalHours = 20;
  desConfigs = [];

  constrsuctor() {}

  ngOnInit(): void {
    console.log('oninit');
    this.desConfigs = this.des.map((p, idx) => {
      const cfg: any = {};
      if (p.statusCd === 'NORMAL') {
        cfg.className = 'normal';
      } else {
        cfg.className = 'in-trouble';
      }
      const width = (p.time / this.totalHours) * this.totalWidth;
      cfg.width = width + 'px';
      cfg.borderRadius = '0';
      if (idx === 0) {
        cfg.borderRadius = '5px 0 0 5px';
      }
      if (idx === this.des.length - 1) {
        cfg.borderRadius = '0 5px 5px 0';
      }
      return cfg;
    });
  }
}
