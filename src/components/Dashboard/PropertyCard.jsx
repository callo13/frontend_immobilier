import React, { useState } from "react";

const PropertyCard = ({ price, size, location, interestedUsers = [], imageUrl, listingUrl }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white rounded-2xl shadow-xl max-w-[340px] w-full overflow-hidden transition-transform duration-300 ${isHovered ? 'translate-y-[-6px] shadow-2xl' : ''}`}
      style={{ boxShadow: isHovered ? '0 25px 50px rgba(0,0,0,0.18)' : '0 15px 30px rgba(0,0,0,0.12)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image + badges */}
      <div className="relative h-[180px] bg-gradient-to-br from-[#2c3e50] to-[#34495e] overflow-hidden">
        <img
          src={imageUrl}
          alt="property"
          className={`w-full h-full object-cover transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}
        />
        {/* Price badge */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-4 py-2 rounded-full font-bold text-lg text-gray-800 shadow-lg">
          {price}
        </div>
        {/* Size badge */}
        <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1.5 rounded-2xl text-xs font-medium backdrop-blur">
          {size}
        </div>
      </div>
      {/* Content */}
      <div className="px-4 py-5 flex flex-col">
        {/* Location */}
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-4 h-4 text-[#2c3e50]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 0c-3.314 0-6 2.239-6 5v1a1 1 0 001 1h10a1 1 0 001-1v-1c0-2.761-2.686-5-6-5z" /></svg>
          <span className="text-base font-semibold text-gray-800">{location}</span>
        </div>
        {/* Interested users */}
        {interestedUsers.length > 0 && (
          <div className="mb-4">
            <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Intéressés :</div>
            <div className="flex flex-wrap gap-2 justify-center">
              {interestedUsers.map((user, idx) => (
                <span
                  key={idx}
                  className={`bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-xs font-semibold transition-all duration-300 cursor-pointer ${isHovered ? 'hover:bg-blue-200 hover:shadow-md' : ''}`}
                >
                  {user}
                </span>
              ))}
            </div>
          </div>
        )}
        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              if (listingUrl) {
                window.open(listingUrl, '_blank', 'noopener,noreferrer');
              }
            }}
            className={`flex-1 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white border-0 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide transition-all duration-300 ${isHovered ? 'translate-y-[-2px] shadow-lg' : ''}`}
          >
            View Listing
          </button>
          <button
            onClick={() => {
              window.open('https://calendar.google.com/calendar/render?action=TEMPLATE', '_blank', 'noopener,noreferrer');
              console.log('Programmer un appel pour:', location);
            }}
            className={`flex-1 bg-gradient-to-r from-[#2c3e50] to-[#34495e] text-white border-0 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide transition-all duration-300 ${isHovered ? 'translate-y-[-2px] shadow-lg' : ''}`}
          >
            Program Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard; 