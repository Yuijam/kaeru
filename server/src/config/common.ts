export const startHour = 4;
export const endHour = 12;
export const startDate = new Date(2020, 11, 10);
export const isCheckingTime = () => new Date().getHours() >= startHour;
