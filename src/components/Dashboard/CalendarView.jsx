import React, { useState, useEffect, useCallback } from "react";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays } from 'date-fns';
import fr from 'date-fns/locale/fr';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'fr': fr,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const events = [
  {
    title: 'Visite - 12 rue Victor Hugo',
    start: new Date(2025, 6, 7, 9, 0),
    end: new Date(2025, 6, 7, 10, 0),
  },
  {
    title: 'Appel estimation - Mme Dupont',
    start: new Date(2025, 6, 8, 14, 0),
    end: new Date(2025, 6, 8, 15, 0),
  },
  {
    title: 'Visite - 8 avenue République',
    start: new Date(2025, 6, 9, 11, 0),
    end: new Date(2025, 6, 9, 12, 0),
  },
  {
    title: 'Signature offre - Agence',
    start: new Date(2025, 6, 10, 16, 0),
    end: new Date(2025, 6, 10, 17, 0),
  },
  {
    title: 'Visite - 5 rue des Lilas',
    start: new Date(2025, 6, 11, 10, 0),
    end: new Date(2025, 6, 11, 11, 0),
  },
  {
    title: 'Appel acquéreur',
    start: new Date(2025, 6, 12, 15, 0),
    end: new Date(2025, 6, 12, 16, 0),
  },
];

const VIEWS = [
  { value: 'day', label: 'Jour' },
  { value: 'week', label: 'Semaine' },
  { value: 'month', label: 'Mois' },
];

// Composant custom pour l'affichage des événements (heure sur la première ligne, titre sur la deuxième)
const CustomEvent = ({ event }) => (
  <div className="p-1 whitespace-normal break-words text-xs font-semibold leading-snug cursor-pointer">
    <div className="font-bold">{format(event.start, 'HH:mm')} – {format(event.end, 'HH:mm')}</div>
    <div>{event.title}</div>
  </div>
);

const CalendarView = () => {
  const [date, setDate] = useState(new Date(2025, 6, 7));
  const [view, setView] = useState('week');
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);
  const [events, setEvents] = useState([]);

  // Vérifier la connexion Google au chargement
  useEffect(() => {
    fetch('http://localhost:5000/api/google/status', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setIsGoogleConnected(!!data.connected));
  }, []);

  // Fonction utilitaire pour obtenir la plage de dates affichée
  const getRange = useCallback((date, view) => {
    let start, end;
    if (view === 'month') {
      start = new Date(date.getFullYear(), date.getMonth(), 1);
      end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
    } else if (view === 'week') {
      const day = date.getDay();
      const diffToMonday = (day + 6) % 7;
      start = new Date(date);
      start.setDate(date.getDate() - diffToMonday);
      start.setHours(0, 0, 0, 0);
      end = new Date(start);
      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);
    } else { // day
      start = new Date(date);
      start.setHours(0, 0, 0, 0);
      end = new Date(date);
      end.setHours(23, 59, 59, 999);
    }
    return {
      start: start.toISOString(),
      end: end.toISOString()
    };
  }, []);

  // Charger les événements à chaque changement de date ou de vue
  const fetchEvents = useCallback(() => {
    if (!isGoogleConnected) return;
    const { start, end } = getRange(date, view);
    fetch(`http://localhost:5000/api/events?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`, {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        const events = Array.isArray(data)
          ? data.map(ev => ({
              ...ev,
              title: ev.summary,
              start: new Date(ev.start?.dateTime || ev.start?.date),
              end: new Date(ev.end?.dateTime || ev.end?.date)
            }))
          : [];
        setEvents(events);
      });
  }, [date, view, isGoogleConnected, getRange]);

  useEffect(() => {
    fetchEvents();
  }, [date, view, isGoogleConnected, fetchEvents]);

  // Années pour la listbox année
  const currentYear = date.getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  const dateInformation = () => {
    if (view === 'day') {
       return format(date, "EEEE d MMMM yyyy", { locale: fr }).charAt(0).toUpperCase() + format(date, "EEEE d MMMM yyyy", { locale: fr }).slice(1);
    } else{
      return format(date, "MMMM yyyy", { locale: fr }).charAt(0).toUpperCase() + format(date, "MMMM yyyy", { locale: fr }).slice(1);
    }
  }

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value, 10);
    setDate(new Date(newYear, date.getMonth(), date.getDate()));
  };

  const handlePrev = () => {
    if (view === 'day') setDate(subDays(date, 1));
    else if (view === 'week') setDate(subWeeks(date, 1));
    else setDate(subMonths(date, 1));
  };
  const handleNext = () => {
    if (view === 'day') setDate(addDays(date, 1));
    else if (view === 'week') setDate(addWeeks(date, 1));
    else setDate(addMonths(date, 1));
  };

  // Fonction pour se connecter à Google via le backend
  const handleGoogleConnect = () => {
    window.location.href = "http://localhost:5000/auth/google";
    checkGoogleConnection();
  };

  // Fonction pour se déconnecter
  const handleGoogleDisconnect = () => {
    fetch('http://localhost:5000/api/google/logout', {
      method: 'POST',
      credentials: 'include',
    }).then(() => setIsGoogleConnected(false));
  };

  // Vérifier la connexion réelle à Google (après focus ou retour popup)
  function checkGoogleConnection() {
    fetch('http://localhost:5000/api/google/status', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setIsGoogleConnected(!!data.connected);
        if (!!data.connected) fetchEvents();
      });
  }

  return (
    <div className="bg-white rounded-2xl shadow p-7 mb-10">
      <h2 className="font-extrabold text-xl text-gray-800 mb-4">Calendrier de la semaine</h2>
      {/* Barre de navigation personnalisée + Listbox vue + Listbox année */}
      <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
        {/* Boutons navigation à gauche */}
        <div className="flex gap-1 items-center">
          <button onClick={handlePrev} className="p-2 rounded hover:bg-blue-100 transition" aria-label="Précédent">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={() => setDate(new Date())} className="bg-blue-800 text-white px-3 py-1 rounded font-semibold hover:bg-blue-900 transition text-sm mx-1">Aujourd'hui</button>
          <button onClick={handleNext} className="p-2 rounded hover:bg-blue-100 transition" aria-label="Suivant">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
        {/* Mois/année centré */}
        <div className="flex-1 flex justify-center">
          <div className="text-lg font-bold text-blue-800">
            {dateInformation()}
          </div>
        </div>
        {/* Sélecteurs vue et année à droite */}
        <div className="flex items-center gap-4">
          <select
            value={view}
            onChange={e => setView(e.target.value)}
            className="border border-blue-200 rounded px-3 py-1 text-blue-800 font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
          >
            <option value="day">Jour</option>
            <option value="week">Semaine</option>
            <option value="month">Mois</option>
          </select>
          <select
            value={currentYear}
            onChange={handleYearChange}
            className="border border-blue-200 rounded px-3 py-1 text-blue-800 font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
          >
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>
      <div style={{ height: 500 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="week"
          views={['day', 'week', 'month']}
          view={view}
          onView={setView}
          culture="fr"
          date={date}
          onNavigate={setDate}
          messages={{ week: 'Semaine', day: 'Jour', month: 'Mois', today: 'Aujourd\'hui', previous: 'Précédent', next: 'Suivant' }}
          style={{ borderRadius: '1rem', background: 'white', padding: 0 }}
          toolbar={false}
          onSelectEvent={event => {
            if (event.htmlLink) {
              window.open(event.htmlLink, '_blank', 'noopener,noreferrer');
            }
          }}
          components={{
            event: CustomEvent
          }}
        />
      </div>
      <div className="mt-4 text-right">
        {isGoogleConnected ? (
          <button onClick={handleGoogleDisconnect} className="bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700 transition text-sm">Se déconnecter Google Calendar</button>
        ) : (
          <button onClick={handleGoogleConnect} className="bg-blue-800 text-white px-4 py-2 rounded font-semibold hover:bg-blue-900 transition text-sm">Connecter Google Calendar</button>
        )}
      </div>
    </div>
  );
};

export default CalendarView;