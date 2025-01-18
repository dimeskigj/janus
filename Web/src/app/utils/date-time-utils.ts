export const getTodayAsDate = () => removeHours(new Date());

export const addDaysToDate = (date: Date, days: number) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const addMinutesToDate = (date: Date, minutes: number) => {
  return new Date(date.getTime() + minutes * 60 * 1000);
};

export const getMinuteDifference = (
  date1: Date | string,
  date2: Date | string,
): number => {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;

  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
    throw new Error('Invalid date(s) provided');
  }

  const diffInMilliseconds = Math.abs(d1.getTime() - d2.getTime());
  return Math.floor(diffInMilliseconds / (1000 * 60));
};

export const removeHours = (date: Date) => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};
