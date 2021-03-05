export const startHour = 4;
export const startHourText = `0${startHour}:00`;
export const endHour = 24;
export const endHourText = `${endHour}:00`;
export const startDate = new Date(2020, 11, 11);

export type TLineConfig = {
  id: number;
  name: string;
  screenName: string;
};

export const getLineName = (lineId: number) => {
  const cfg = lineConfigs.find(({ id }) => id === lineId);
  return cfg?.name || '';
};

export const lineConfigs: TLineConfig[] = [
  {
    id: 1,
    name: '京王線',
    screenName: 'keiodentetsu',
  },
  {
    id: 2,
    name: '京急線',
    screenName: 'keikyu_official',
  },
  {
    id: 3,
    name: '小田急線',
    screenName: 'odakyuline_info',
  },
  {
    id: 4,
    name: '有楽町線',
    screenName: 'Y_line_info',
  },
  {
    id: 5,
    name: '副都心線',
    screenName: 'F_line_info',
  },
  {
    id: 6,
    name: '丸ノ内線',
    screenName: 'M_line_info',
  },
  {
    id: 7,
    name: '千代田線',
    screenName: 'C_line_info',
  },
  {
    id: 8,
    name: '東急線',
    screenName: 'tokyu_official',
  },
  {
    id: 9,
    name: '南北線',
    screenName: 'N_line_info',
  },
  {
    id: 10,
    name: '半蔵門線',
    screenName: 'Z_line_info',
  },
  {
    id: 11,
    name: '銀座線',
    screenName: 'G_line_info',
  },
  {
    id: 12,
    name: '東西線',
    screenName: 'T_line_info',
  },
  {
    id: 13,
    name: '日比谷線',
    screenName: 'H_line_info',
  },
];
