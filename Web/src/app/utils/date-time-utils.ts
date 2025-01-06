export const getTodayAsDate = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
};

export const addDaysToDate = (date: Date, days: number) => {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
