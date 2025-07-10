import React from "react";
import './App.css'
import './index.css'

const kpiData = [
  {
    value: "125",
    label: "Leads",
    sub: "This Month",
    icon: null,
  },
  {
    value: "8",
    label: "Appointments",
    sub: "Scheduled",
    icon: null,
  },
  {
    value: "25%",
    label: "Conversion",
    sub: "Rate",
    icon: null,
  },
  {
    value: "15",
    label: "Active",
    sub: "Listings",
    icon: (
      <svg className="w-7 h-7 text-blue-800 mr-2 inline-block align-middle" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>
    ),
  },
];

const listings = [
  {
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    price: "$350,000",
    city: "Atlanta",
    size: "1,800 sq ft",
    date: "2d ago",
  },
  {
    img: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80",
    price: "$475,000",
    city: "Dallas",
    size: "2,100 sq ft",
    date: "2d ago",
  },
  {
    img: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80",
    price: "$410,000",
    city: "Paris",
    size: "1,500 sq ft",
    date: "1d ago",
  },
  {
    img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80",
    price: "$520,000",
    city: "Lyon",
    size: "2,000 sq ft",
    date: "1d ago",
  },
];

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f5f3ef] px-4 md:px-8 xl:px-12 2xl:px-16 py-6 font-sans w-full">
      {/* Header */}
      <h1 className="text-5xl font-extrabold text-blue-800 mb-8 tracking-tight">DASHBOARD</h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map((kpi, i) => (
          <div key={i} className="bg-white rounded-2xl shadow p-7 flex items-center gap-4">
            {kpi.icon}
            <div className="flex flex-col items-start">
              <span className="text-5xl font-extrabold text-blue-800 leading-none">{kpi.value}</span>
              <span className="font-bold text-lg text-gray-800">{kpi.label} <span className="font-normal text-gray-500">{kpi.sub}</span></span>
            </div>
          </div>
        ))}
      </div>

      {/* Graphique (statique) */}
      <div className="bg-white rounded-2xl p-7 shadow mb-10">
        <h2 className="font-extrabold text-xl text-gray-800 mb-2">Appointments</h2>
        <div className="w-full h-36 flex items-end">
          {/* Graphique simple en SVG */}
          <svg viewBox="0 0 320 100" className="w-full h-full">
            <polyline
              fill="none"
              stroke="#f97316"
              strokeWidth="4"
              points="0,70 50,50 100,60 150,30 200,50 250,40 320,20"
            />
            {/* Points */}
            <circle cx="0" cy="70" r="6" fill="#f97316" />
            <circle cx="50" cy="50" r="6" fill="#f97316" />
            <circle cx="100" cy="60" r="6" fill="#f97316" />
            <circle cx="150" cy="30" r="6" fill="#f97316" />
            <circle cx="200" cy="50" r="6" fill="#f97316" />
            <circle cx="250" cy="40" r="6" fill="#f97316" />
            <circle cx="320" cy="20" r="6" fill="#f97316" />
            {/* Jours */}
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

      {/* Annonces récentes */}
      <h2 className="text-3xl font-extrabold text-blue-800 mb-6 tracking-tight uppercase">Recent Listings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {listings.map((l, i) => (
          <div key={i} className="bg-white rounded-2xl shadow p-0 overflow-hidden flex flex-col">
            <img src={l.img} alt="listing" className="w-full h-48 object-cover" />
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="font-extrabold text-2xl text-gray-900">{l.price}</span>
                <span className="text-gray-500 text-base">{l.size}</span>
              </div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-700 font-semibold">{l.city}</span>
                <span className="text-gray-400 text-sm">{l.date}</span>
              </div>
              <button className="mt-4 bg-orange-500 text-white rounded-lg py-2 font-bold text-lg hover:bg-orange-600 transition">View Listing</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
