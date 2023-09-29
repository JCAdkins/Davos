import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import "./Sample.css";

export default function DefaultCalendar() {
  const [value, onChange] = useState(new Date());
  const [displayEvent, setDisplayEvent] = useState(false);

  const handleDateChange = (value) => {
    console.log(value);
    onChange(value);
    setDisplayEvent(events.includes(value));
  };

  const events = [
    {
      title: "CPVA: Certified Patient Valuation Analyst",
      description: "Some description.",
      date: new Date("9/28/2023"),
      link: "",
    },
    {
      title: "CPVA: Certified Patient Valuation Analyst",
      description: "Some description.",
      date: new Date("9/28/2023"),
      link: "",
    },
    {
      title: "Analyzing Some Shit II",
      description: "This description blows hard.",
      date: new Date("9/10/2023"),
      link: "",
    },
    {
      title: "Certified Patient Valuation Analyst III",
      description: "This description blows even harder.",
      date: new Date("10/07/2023"),
      link: "",
    },
  ];

  return (
    <div className="Sample">
      <div className="Sample__container">
        <main className="Sample__container__content">
          <Calendar
            calendarType="gregory"
            onChange={handleDateChange}
            value={value}
          />
        </main>
      </div>
    </div>
  );
}
