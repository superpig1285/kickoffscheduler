import { useState } from "react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

function getStartDay(year, month) {
    return new Date(year, month, 1).getDay();
}

export default function Calendar() {
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());

    const daysInMonth = getDaysInMonth(year, month);
    const startDay = getStartDay(year, month);

    const prevMonth = () => {
        if (month === 0) {
            setMonth(11);
            setYear((y) => y - 1);
        } else {
            setMonth((m) => m - 1);
        }
    };

    const nextMonth = () => {
        if (month === 11) {
            setMonth(0);
            setYear((y) => y + 1);
        } else {
            setMonth((m) => m + 1);
        }
    };

    const cells = [];
    for (let i = 0; i < startDay; i++) {
        cells.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
        cells.push(d);
    }

    return (
        <div className="calendar">
            <div className="calendar-header">
                <button onClick={prevMonth}>◀</button>
                <h2>
                    {new Date(year, month).toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                    })}
                </h2>
                <button onClick={nextMonth}>▶</button>
            </div>

            <div className="calendar-grid">
                {DAYS.map((day) => (
                    <div key={day} className="calendar-day-name">
                        {day}
                    </div>
                ))}

                {cells.map((day, i) => (
                    <div key={i} className={`calendar-cell ${day ? "" : "empty"}`}>
                        {day}
                    </div>
                ))}
            </div>
        </div>
    );
}
