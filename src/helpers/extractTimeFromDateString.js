export function extractTimeFromDateString(dataString) {
  if (!dataString || typeof dataString !== "string") {
    throw new Error("Invalid date string");
  }

  try {
    const date = new Date(dataString);
    if (!isNaN(date.getTime())) {
      const hours = String(date.getUTCHours()).padStart(2, "0");
      const minutes = String(date.getUTCMinutes()).padStart(2, "0");
      if (hours > 23 || minutes > 59) {
        throw new Error("Invalid time values");
      }
      return `${hours}:${minutes}`;
    }
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    // console.log(error.message);
    throw new Error("Error processing the date string");
  }

  throw new Error("Invalid date string format");
}
