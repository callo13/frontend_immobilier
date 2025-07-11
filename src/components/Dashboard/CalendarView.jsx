import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, addMonths, subMonths } from 'date-fns';
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

const CalendarView = () => {
  const [date, setDate] = useState(new Date(2025, 6, 7));
  const [view, setView] = useState('week');

  // Années pour la listbox année
  const currentYear = date.getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value, 10);
    setDate(new Date(newYear, date.getMonth(), date.getDate()));
  };

  return (
    <div className="bg-white rounded-2xl shadow p-7 mb-10">
      <h2 className="font-extrabold text-xl text-gray-800 mb-4">Calendrier de la semaine</h2>
      {/* Barre de navigation personnalisée + Listbox vue + Listbox année */}
      <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
        {/* Boutons navigation à gauche */}
        <div className="flex gap-1 items-center">
          <button onClick={() => setDate(subMonths(date, 1))} className="p-2 rounded hover:bg-blue-100 transition" aria-label="Mois précédent">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={() => setDate(new Date())} className="bg-blue-800 text-white px-3 py-1 rounded font-semibold hover:bg-blue-900 transition text-sm mx-1">Aujourd'hui</button>
          <button onClick={() => setDate(addMonths(date, 1))} className="p-2 rounded hover:bg-blue-100 transition" aria-label="Mois suivant">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
        {/* Mois/année centré */}
        <div className="flex-1 flex justify-center">
          <div className="text-lg font-bold text-blue-800">
            {format(date, "MMMM yyyy", { locale: fr }).charAt(0).toUpperCase() + format(date, "MMMM yyyy", { locale: fr }).slice(1)}
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
        />
      </div>
      <div className="mt-4 text-right">
        <button className="bg-blue-800 text-white px-4 py-2 rounded font-semibold hover:bg-blue-900 transition text-sm">Connecter Google Calendar</button>
      </div>
    </div>
  );
};

export default CalendarView; 