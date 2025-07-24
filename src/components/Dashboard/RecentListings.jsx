import React, { useState, useMemo } from "react";
import ListingCard from "./ListingCard";

const RecentListings = ({ listings }) => {
  // Extraire toutes les personnes intéressées uniques
  const allPeople = useMemo(() => {
    const people = new Set();
    listings.forEach(l => Array.isArray(l.interested) && l.interested.forEach(p => people.add(p)));
    return Array.from(people);
  }, [listings]);

  const [filter, setFilter] = useState("");

  // Filtrer les listings selon la personne sélectionnée
  const filteredListings = useMemo(() => {
    if (!filter) return listings;
    return listings.filter(l => Array.isArray(l.interested) && l.interested.includes(filter));
  }, [filter, listings]);

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-blue-800 mb-6 tracking-tight uppercase">Recent Listings</h2>
      {/* Filtre par personne intéressée */}
      {allPeople.length > 0 && (
        <div className="mb-6 flex items-center gap-2">
          <label htmlFor="filter-person" className="text-sm font-semibold text-gray-700">Filtrer par personne :</label>
          <select
            id="filter-person"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="border border-blue-200 rounded px-3 py-1 text-blue-800 font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
          >
            <option value="">Toutes</option>
            {allPeople.map(person => (
              <option key={person} value={person}>{person}</option>
            ))}
          </select>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredListings.map((l, i) => (
          <ListingCard key={i} {...l} />
        ))}
      </div>
    </div>
  );
};

export default RecentListings; 