export type TPeriod = {
  time: number;
  statusCd: string;
};

export type TLineDesData = TPeriod[];

export type TLineItemData = {
  lineName: string;
  lineDes: TLineDesData;
};

export type TPeriodCfg = {
  className: 'normal' | 'in-trouble';
  width: string;
};
