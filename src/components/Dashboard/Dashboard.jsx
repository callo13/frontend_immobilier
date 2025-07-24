import React from "react";
import KpiGrid from "./KpiGrid";
import AppointmentsChart from "./AppointmentsChart";
import RecentListings from "./RecentListings";
import CalendarView from "./CalendarView";

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
    interested: ["Pierre Pertuis","Paul Roussel","Jacques Dutronc"],
  },
  {
    img: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80",
    price: "$475,000",
    city: "Dallas",
    size: "2,100 sq ft",
    date: "2d ago",
    interested: ["Pierre Pertuis","René","Arthur"],
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

const Dashboard = () => (
  <div className="min-h-screen bg-[#f5f3ef] px-4 md:px-8 xl:px-12 2xl:px-16 py-6 font-sans w-full max-w-screen-2xl mx-auto">
    <h1 className="text-5xl font-extrabold text-blue-800 mb-8 tracking-tight">DASHBOARD</h1>
    <KpiGrid kpiData={kpiData} />
    <CalendarView />
    <AppointmentsChart />
    <RecentListings listings={listings} />
  </div>
);

export default Dashboard; 