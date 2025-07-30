import React, { useState, useMemo, useEffect } from "react";
import PropertyCard from "./PropertyCard";

const RecentListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer les données depuis l'API
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/biens');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setListings(data.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des biens:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Extraire toutes les personnes intéressées uniques (depuis les contacts clients)
  const allPeople = useMemo(() => {
    const people = new Set();
    if (Array.isArray(listings)) {
      listings.forEach(l => {
        if (Array.isArray(l["Contacts clients"])) {
          l["Contacts clients"].forEach(contact => people.add(contact));
        }
      });
    }
    return Array.from(people);
  }, [listings]);

  const [filter, setFilter] = useState("");

  // Filtrer les listings selon la personne sélectionnée
  const filteredListings = useMemo(() => {
    if (!Array.isArray(listings)) return [];
    if (!filter) return listings;
    return listings.filter(l => 
      Array.isArray(l["Contacts clients"]) && 
      l["Contacts clients"].includes(filter)
    );
  }, [filter, listings]);

  // Fonction pour formater le prix
  const formatPrice = (price) => {
    return `${price.toLocaleString('fr-FR')} €`;
  };

  // Fonction pour formater la surface
  const formatSize = (surface) => {
    return `${surface} m²`;
  };

  if (loading) {
    return (
      <div>
        <h2 className="text-3xl font-extrabold text-blue-800 mb-6 tracking-tight uppercase">Recent Listings</h2>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Chargement des annonces...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2 className="text-3xl font-extrabold text-blue-800 mb-6 tracking-tight uppercase">Recent Listings</h2>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">Erreur: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-extrabold text-blue-800 mb-6 tracking-tight uppercase">Recent Listings</h2>
      {/* Filtre par personne intéressée */}
      {allPeople.length > 0 && (
        <div className="mb-6 flex items-center gap-2">
          <label htmlFor="filter-person" className="text-sm font-semibold text-gray-700">Filtrer par contact :</label>
          <select
            id="filter-person"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="border border-blue-200 rounded px-3 py-1 text-blue-800 font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
          >
            <option value="">Tous les contacts</option>
            {allPeople.map(person => (
              <option key={person} value={person}>{person}</option>
            ))}
          </select>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredListings.map((listing) => (
          <PropertyCard
            key={listing.id}
            price={formatPrice(listing["Loyer mensuel (€)"])}
            size={formatSize(listing["Surface en m²"])}
            location={listing.Ville}
            interestedUsers={listing["Contacts clients"] || []}
            imageUrl={listing.Image}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentListings; 