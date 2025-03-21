import React, { useState } from "react";
import { FaMoon, FaSun, FaRegSun } from "react-icons/fa";
import "../CSS/TimeSlotSelector.css";

const TimeSlotSelector = ({ onTimeSelect, bookedSlots = [] }) => {
  const [selectedTime, setSelectedTime] = useState(null);

  const timeSlots = {
    Night: ["1:00 AM", "2:00 AM", "3:00 AM", "4:00 AM", "5:00 AM"],
    Morning: [
      "6:00 AM",
      "7:00 AM",
      "8:00 AM",
      "9:00 AM",
      "10:00 AM",
      "11:00 AM",
    ],
    Afternoon: [
      "12:00 PM",
      "1:00 PM",
      "2:00 PM",
      "3:00 PM",
      "4:00 PM",
      "5:00 PM",
    ],
    Evening: [
      "6:00 PM",
      "7:00 PM",
      "8:00 PM",
      "9:00 PM",
      "10:00 PM",
      "11:00 PM",
    ],
  };

  const timeIcons = {
    Night: <FaMoon size={30} />,
    Morning: <FaRegSun size={30} />,
    Afternoon: <FaSun size={30} />,
    Evening: <FaRegSun size={30} />,
  };

  const convertTo24Hour = (time) => {
    const [timePart, period] = time.split(" ");
    const [hour] = timePart.split(":");
    let hourNum = parseInt(hour, 10);
    if (period === "PM" && hourNum !== 12) {
      hourNum += 12;
    } else if (period === "AM" && hourNum === 12) {
      hourNum = 0;
    }
    return hourNum;
  };

  const handleSelect = (time) => {
    setSelectedTime(time);
    onTimeSelect(convertTo24Hour(time));
  };

  return (
    <div className="time-slot-container">  
      {Object.entries(timeSlots).map(([period, slots]) => (
        <div key={period} className="time-group">
          <div className="time-header">
            {timeIcons[period]}
            <h3>{period}</h3>
          </div>
          <div className="time-buttons">
            {slots.map((slot) => {
              const slot24 = convertTo24Hour(slot);
              const isBooked = bookedSlots.some((bs) => Number(bs) === slot24);
              return (
                <button
                  key={slot}
                  className={`time-slot ${  
                    selectedTime === slot ? "selected" : ""
                  }`}
                  onClick={() => !isBooked && handleSelect(slot)}
                  disabled={isBooked}
                >
                  {slot} {isBooked ? "(Booked)" : ""}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimeSlotSelector;
