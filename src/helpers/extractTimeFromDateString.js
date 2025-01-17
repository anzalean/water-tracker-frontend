export function extractTimeFromDateString(dataString) {
  if (!dataString || typeof dataString !== "string") {
    throw new Error("Invalid date string");
  }
  const date = new Date(dataString);
  if (!isNaN(date.getTime())) {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  const timeRegex = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/;
  const match = dataString.match(timeRegex);

  if (!match) {
    throw new Error(
      "String must contain a valid time in the format HH:mm or HH:mm:ss"
    );
  }

  const hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);

  if (hours > 23 || minutes > 59) {
    throw new Error("Invalid time values");
  }

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
}
