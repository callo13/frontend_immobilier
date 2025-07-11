import React from "react";

const AppointmentsChart = () => (
  <div className="bg-white rounded-2xl p-7 shadow mb-10">
    <h2 className="font-extrabold text-xl text-gray-800 mb-2">Appointments</h2>
    <div className="w-full h-36 flex items-end">
      <svg viewBox="0 0 320 100" className="w-full h-full">
        <polyline
          fill="none"
          stroke="#f97316"
          strokeWidth="4"
          points="0,70 50,50 100,60 150,30 200,50 250,40 320,20"
        />
        <circle cx="0" cy="70" r="6" fill="#f97316" />
        <circle cx="50" cy="50" r="6" fill="#f97316" />
        <circle cx="100" cy="60" r="6" fill="#f97316" />
        <circle cx="150" cy="30" r="6" fill="#f97316" />
        <circle cx="200" cy="50" r="6" fill="#f97316" />
        <circle cx="250" cy="40" r="6" fill="#f97316" />
        <circle cx="320" cy="20" r="6" fill="#f97316" />
        <text x="0" y="95" fontSize="15" className="fill-gray-500">Mon</text>
        <text x="50" y="95" fontSize="15" className="fill-gray-500">Tue</text>
        <text x="100" y="95" fontSize="15" className="fill-gray-500">Wed</text>
        <text x="150" y="95" fontSize="15" className="fill-gray-500">Thu</text>
        <text x="200" y="95" fontSize="15" className="fill-gray-500">Fri</text>
        <text x="250" y="95" fontSize="15" className="fill-gray-500">Sat</text>
        <text x="300" y="95" fontSize="15" className="fill-gray-500">Sun</text>
      </svg>
    </div>
  </div>
);

export default AppointmentsChart; 