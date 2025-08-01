import React from "react";

const AppointmentsChart = () => (
  <div className="bg-white rounded-2xl p-7 shadow mb-10">
    <h2 className="font-extrabold text-xl text-gray-800 mb-2">Appointments</h2>
    <div className="w-full h-48 flex items-end">
      <svg viewBox="0 0 320 140" className="w-full h-full">
        {/* Grille horizontale pour les valeurs Y */}
        <line x1="0" y1="20" x2="320" y2="20" stroke="#e5e7eb" strokeWidth="1" />
        <line x1="0" y1="40" x2="320" y2="40" stroke="#e5e7eb" strokeWidth="1" />
        <line x1="0" y1="60" x2="320" y2="60" stroke="#e5e7eb" strokeWidth="1" />
        <line x1="0" y1="80" x2="320" y2="80" stroke="#e5e7eb" strokeWidth="1" />
        <line x1="0" y1="100" x2="320" y2="100" stroke="#e5e7eb" strokeWidth="1" />
        
        {/* Valeurs en ordonnée (axe Y) */}
        <text x="-10" y="25" fontSize="12" className="fill-gray-400" textAnchor="end">8</text>
        <text x="-10" y="45" fontSize="12" className="fill-gray-400" textAnchor="end">6</text>
        <text x="-10" y="65" fontSize="12" className="fill-gray-400" textAnchor="end">4</text>
        <text x="-10" y="85" fontSize="12" className="fill-gray-400" textAnchor="end">2</text>
        <text x="-10" y="105" fontSize="12" className="fill-gray-400" textAnchor="end">0</text>
        
        {/* Ligne de données */}
        <polyline
          fill="none"
          stroke="#f97316"
          strokeWidth="4"
          points="0,70 50,50 100,60 150,30 200,50 250,100 320,100"
        />
        <circle cx="0" cy="70" r="6" fill="#f97316" />
        <circle cx="50" cy="50" r="6" fill="#f97316" />
        <circle cx="100" cy="60" r="6" fill="#f97316" />
        <circle cx="150" cy="30" r="6" fill="#f97316" />
        <circle cx="200" cy="50" r="6" fill="#f97316" />
        <circle cx="250" cy="100" r="6" fill="#f97316" />
        <circle cx="320" cy="100" r="6" fill="#f97316" />
        
        {/* Valeurs en abscisse (axe X) avec jours et nombres */}
        <text x="0" y="125" fontSize="12" className="fill-gray-500" textAnchor="middle">Mon<br/><tspan x="0" dy="15" fontSize="10">3</tspan></text>
        <text x="50" y="125" fontSize="12" className="fill-gray-500" textAnchor="middle">Tue<br/><tspan x="50" dy="15" fontSize="10">5</tspan></text>
        <text x="100" y="125" fontSize="12" className="fill-gray-500" textAnchor="middle">Wed<br/><tspan x="100" dy="15" fontSize="10">4</tspan></text>
        <text x="150" y="125" fontSize="12" className="fill-gray-500" textAnchor="middle">Thu<br/><tspan x="150" dy="15" fontSize="10">7</tspan></text>
        <text x="200" y="125" fontSize="12" className="fill-gray-500" textAnchor="middle">Fri<br/><tspan x="200" dy="15" fontSize="10">5</tspan></text>
        <text x="250" y="125" fontSize="12" className="fill-gray-500" textAnchor="middle">Sat<br/><tspan x="250" dy="15" fontSize="10">6</tspan></text>
        <text x="300" y="125" fontSize="12" className="fill-gray-500" textAnchor="middle">Sun<br/><tspan x="300" dy="15" fontSize="10">8</tspan></text>
      </svg>
    </div>
  </div>
);

export default AppointmentsChart; 