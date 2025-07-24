import React from "react";

const ListingCard = ({ img, price, city, size, date, interested }) => (
  <div className="bg-white rounded-2xl shadow p-0 overflow-hidden flex flex-col">
    <img src={img} alt="listing" className="w-full h-48 object-cover" />
    <div className="p-5 flex flex-col flex-1">
      <div className="flex items-center justify-between mb-2">
        <span className="font-extrabold text-2xl text-gray-900">{price}</span>
        <span className="text-gray-500 text-base">{size}</span>
      </div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-gray-700 font-semibold">{city}</span>
        <span className="text-gray-400 text-sm">{date}</span>
      </div>
      {Array.isArray(interested) && interested.length > 0 && (
        <div className="mb-2">
          <div className="text-sm text-blue-700 font-medium mb-1">Intéressés :</div>
          <ul className="flex flex-wrap gap-2 justify-center">
            {interested.map((person, idx) => (
              <li key={idx} className="bg-blue-100 text-blue-800 rounded px-2 py-0.5 text-xs font-semibold">
                {person}
              </li>
            ))}
          </ul>
        </div>
      )}
      <button className="mt-4 bg-orange-500 text-white rounded-lg py-2 font-bold text-lg hover:bg-orange-600 transition">View Listing</button>
    </div>
  </div>
);

export default ListingCard; 