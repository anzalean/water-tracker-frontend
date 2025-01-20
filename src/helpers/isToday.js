export const isToday = (currentDate) => {
  const today = new Date();
  const date = new Date(currentDate);
  const formattedToday = today.toLocaleDateString();
  const formattedDate = date.toLocaleDateString();

  return formattedToday === formattedDate;
};
