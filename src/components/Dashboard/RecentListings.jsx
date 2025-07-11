import React from "react";
import ListingCard from "./ListingCard";

const RecentListings = ({ listings }) => (
  <div>
    <h2 className="text-3xl font-extrabold text-blue-800 mb-6 tracking-tight uppercase">Recent Listings</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {listings.map((l, i) => (
        <ListingCard key={i} {...l} />
      ))}
    </div>
  </div>
);

export default RecentListings; 