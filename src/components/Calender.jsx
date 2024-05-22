import React, { useState } from "react";

function Calendar() {
  const [events, setEvents] = useState([
    { date: "2023-06-01", title: "Team Meeting" },
    { date: "2023-06-12", title: "Project Deadline" },
    { date: "2023-06-15", title: "Design Review" },
    { date: "2023-06-18", title: "Team Meeting" },
    { date: "2023-06-20", title: "Product Launch" },
    { date: "2023-06-22", title: "Client Meeting" },
  ]);

  const renderCalendar = () => {
    const daysInMonth = new Date(2023, 6, 0).getDate();
    const firstDayOfMonth = new Date(2023, 5, 1).getDay();
    const weeks = [];

    let days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div
          key={`empty-${i}`}
          className="flex items-start justify-start w-40 h-full pl-2 pr-24 pt-2.5 pb-20 border border-gray-200"
        ></div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(
        <div
          key={day}
          className="flex items-start justify-start w-40 h-full pl-2 pr-24 pt-2.5 pb-20 border border-gray-200"
        >
          <div className="text-gray-700">{day}</div>
          <div className="text-xs text-blue-600 ml-3">
            {events
              .filter((event) => new Date(event.date).getDate() === day)
              .map((event, index) => (
                <div key={index}>{event.title}</div>
              ))}
          </div>
        </div>
      );

      if ((day + firstDayOfMonth) % 7 === 0 || day === daysInMonth) {
        weeks.push(
          <div
            key={day}
            className="inline-flex items-center justify-start w-full h-full"
          >
            {days}
          </div>
        );
        days = [];
      }
    }

    return weeks;
  };

  return (
    <div className="bg-white md:py-8 px-4 lg:max-w-7xl lg:mx-auto lg:px-8">
      <p className="text-4xl font-bold text-gray-800 mb-8">Haziran 2024</p>
      <div className="inline-flex flex-col space-y-1 items-start justify-start h-full w-full">
        <div className="inline-flex space-x-28 items-start justify-start pr-20 h-full w-full">
          <p className="w-12 h-full text-sm font-medium text-gray-800 uppercase">
            Pzt
          </p>
          <p className="w-12 h-full text-sm font-medium text-gray-800 uppercase">
            Sal
          </p>
          <p className="w-12 h-full text-sm font-medium text-gray-800 uppercase">
            Çar
          </p>
          <p className="w-12 h-full text-sm font-medium text-gray-800 uppercase">
            Per
          </p>
          <p className="w-12 h-full text-sm font-medium text-gray-800 uppercase">
            Cum
          </p>
          <p className="w-12 h-full text-sm font-medium text-gray-800 uppercase">
            Cmt
          </p>
          <p className="w-12 h-full text-sm font-medium text-gray-800 uppercase">
            Paz
          </p>
        </div>
        <div className="flex flex-col items-start justify-start">
          {renderCalendar()}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
