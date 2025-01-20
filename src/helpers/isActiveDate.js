export const isActiveDate = (currentDate, calendarDate) => {
  const changeDate = new Date(calendarDate);
  const date = new Date(currentDate);
  const formattedChangeDate = changeDate.toLocaleDateString();
  const formattedDate = date.toLocaleDateString();

  return formattedChangeDate === formattedDate;
};
