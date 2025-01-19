export const getFirstDayOfMonth = (date = null) => {
  const currentDate = date ? new Date(date) : new Date();
  currentDate.setUTCDate(1);
  currentDate.setUTCHours(0, 0, 0, 0);
  return currentDate.toISOString();
};
