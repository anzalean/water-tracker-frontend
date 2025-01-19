export const calculateDaysInMonth = (isoDateString) => {
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = date.getMonth();
  const days = new Date(year, month + 1, 0).getDate();

  return Array.from({ length: days }, (_, index) => index + 1);
};
