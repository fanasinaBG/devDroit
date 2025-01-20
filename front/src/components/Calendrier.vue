<template>
    <div>
      <h1>Calendrier</h1>
      <!-- FullCalendar Component -->
      <FullCalendar :events="events" :plugins="calendarPlugins" :initialView="'dayGridMonth'" />
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import FullCalendar from '@fullcalendar/vue3'; // Import du composant FullCalendar
  import dayGridPlugin from '@fullcalendar/daygrid'; // Plugin pour afficher le calendrier sous forme de grille
  import interactionPlugin from '@fullcalendar/interaction'; // Plugin pour la gestion des événements
  import timeGridPlugin from '@fullcalendar/timegrid';
  
  export default defineComponent({
    name: 'Calendrier',
    components: {
      FullCalendar // Enregistrement du composant FullCalendar
    },
    data() {
      return {
        // Liste des événements
        events: [
          { title: 'Réunion d\'équipe', date: '2025-01-21' },
          { title: 'Conférence', date: '2025-01-22' },
          { title: 'Rendez-vous client', date: '2025-01-23' },
        ],
        // Configuration des plugins de FullCalendar

        calendarPlugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialView: 'dayGridMonth',
      };
    }
  });
  </script>
  
  <style>
  /* Vous pouvez personnaliser le style du calendrier ici si nécessaire */
  </style>
  