import React from "react";

const ChooseDate = ({ date, onChange }) => {
  const handleDateChange = (event) => {
    const newDate = new Date(event.target.value);
    onChange(newDate);
  };

  return (
    <div>
      <label htmlFor="date-picker">Choose Date:</label>
      <input
        id="date-picker"
        type="date"
        value={date.toISOString().split("T")[0]}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default ChooseDate;
