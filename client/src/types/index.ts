export type TPeriod = {
  time: number;
  statusCd: string;
};

export type TLineDesData = TPeriod[];

export type TLineItemData = {
  lineName: string;
  lineDes: TLineDesData;
  lineMsgList: string[];
};

export type TPeriodCfg = {
  className: 'normal' | 'in-trouble';
  width: string;
};

export type TDataItem = {
  name: string;
  colorWidth: string;
  value: number;
};
