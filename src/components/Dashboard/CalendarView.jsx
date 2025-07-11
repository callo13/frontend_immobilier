import React from "react";
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
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

// Exemple d'événements fictifs
const events = [
  {
    title: 'Visite - 12 rue Victor Hugo',
    start: new Date(2025, 6, 7, 9, 0), // Lundi 7 juillet 2025, 09:00
    end: new Date(2025, 6, 7, 10, 0),
  },
  {
    title: 'Appel estimation - Mme Dupont',
    start: new Date(2025, 6, 8, 14, 0), // Mardi 8 juillet 2025, 14:00
    end: new Date(2025, 6, 8, 15, 0),
  },
  {
    title: 'Visite - 8 avenue République',
    start: new Date(2025, 6, 9, 11, 0), // Mercredi 9 juillet 2025, 11:00
    end: new Date(2025, 6, 9, 12, 0),
  },
  {
    title: 'Signature offre - Agence',
    start: new Date(2025, 6, 10, 16, 0), // Jeudi 10 juillet 2025, 16:00
    end: new Date(2025, 6, 10, 17, 0),
  },
  {
    title: 'Visite - 5 rue des Lilas',
    start: new Date(2025, 6, 11, 10, 0), // Vendredi 11 juillet 2025, 10:00
    end: new Date(2025, 6, 11, 11, 0),
  },
  {
    title: 'Appel acquéreur',
    start: new Date(2025, 6, 12, 15, 0), // Samedi 12 juillet 2025, 15:00
    end: new Date(2025, 6, 12, 16, 0),
  },
];

const CalendarView = () => (
  <div className="bg-white rounded-2xl shadow p-7 mb-10">
    <h2 className="font-extrabold text-xl text-gray-800 mb-4">Calendrier de la semaine</h2>
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={['week']}
        culture="fr"
        messages={{ week: 'Semaine', day: 'Jour', today: 'Aujourd\'hui', previous: 'Précédent', next: 'Suivant' }}
        style={{ borderRadius: '1rem', background: 'white', padding: 0 }}
      />
    </div>
    <div className="mt-4 text-right">
      <button className="bg-blue-800 text-white px-4 py-2 rounded font-semibold hover:bg-blue-900 transition text-sm">Connecter Google Calendar</button>
    </div>
  </div>
);

export default CalendarView; 