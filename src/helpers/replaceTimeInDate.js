export function replaceTimeInDate(dateString, newTime) {
  if (!dateString || !newTime) {
    throw new Error("Both dateString and newTime are required");
  }
  const dateObj = new Date(dateString);

  if (isNaN(dateObj)) {
    throw new Error("Invalid dateString format");
  }
  const [hours, minutes] = newTime.split(":").map(Number);

  if (isNaN(hours) || isNaN(minutes)) {
    throw new Error("Invalid newTime format. Expected 'HH:MM'.");
  }
  dateObj.setUTCHours(hours);
  dateObj.setUTCMinutes(minutes);
  dateObj.setUTCSeconds(0);
  dateObj.setUTCMilliseconds(0);

  return dateObj.toISOString();
}
