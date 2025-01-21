<template>
  <div>
    <h1>Calendrier Interactif des Échéances - {{ this.currentYear }}</h1>
    <div class="year-navigation">
      <button @click="changeYear(-1)">Précédent</button>
      <button @click="changeYear(1)">Suivant</button>
    </div>

    <!-- Boutons de navigation pour changer d'année -->

    <div class="calendar-container">
      <div v-for="month in months" :key="month.number" class="month">
        <h3>{{ month.name }}</h3>
        <!-- Jours de la semaine -->
        <div class="weekdays">
          <div v-for="weekday in weekdays" :key="weekday" class="weekday">
            {{ weekday }}
          </div>
        </div>
        <!-- Jours du mois -->
        <div class="days">
          <div 
            v-for="(day, index) in getDaysInMonth(month.number)" 
            :key="index" 
            :class="['day', { 'empty': day === null }]" 
            @click="day && viewEventDetails(month.number, day)">
            <div v-if="day" class="day-number">{{ day }}</div>
            <div 
              v-if="day" 
              class="event" 
              v-for="event in filterEventsByDate(month.number, day)" 
              :key="event.start">
              <span :class="event.type">{{ event.type }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal et formulaire inchangés -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>Événements pour le {{ selectedDay }} {{ selectedMonthName }} {{ currentYear }}</h2>
        <div v-if="eventsForSelectedDate.length > 0">
          <ul>
            <li v-for="event in eventsForSelectedDate" :key="event.start">
              <strong>{{ event.title }}</strong><br>
              <span>{{ formatDate(event.datedebut) }} - {{ formatDate(event.datefin) }}</span><br>
              <span>{{ event.type || 'Type non défini' }}</span><br>
              <button @click="editEvent(event)">Payer</button>
            </li>
          </ul>
        </div>
        <div v-else>
          <p>Aucun événement trouvé pour cette date.</p>
        </div>
        <button @click="closeModal">Fermer</button>
      </div>
    </div>

    <div v-if="showEventForm" class="modal">
      <div class="modal-content">
        <h2>{{ isEditing ? 'Modifier' : 'Ajouter' }} un événement</h2>

        <!-- Numéro de carte bancaire -->
        <label>
          Numéro de la carte :
          <input type="text" v-model="payement.cardNumber" maxlength="16" required />
        </label>

        <!-- Nombre de mois -->
        <label>
          Combien de mois :
          <input type="number" v-model="payement.mois" min="1" required />
        </label>

        <!-- Boutons -->
        <button @click="saveEvent(payement)">Payer</button>
        <button @click="closeModal" style="margin-left: 10px;">Annuler</button>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
export default {
  name: 'CalendrierInteractif',
  data() {
    return {
      currentYear: new Date().getFullYear(),
      events: [],
      showModal: false,
      showEventForm: false,
      selectedDay: null,
      selectedMonthName: '',
      payement: {
        id: 0,
        carte: 0,
        date: 0,
        mois: 0,
      },
      eventsForSelectedDate: [],
      months: [
        { number: 0, name: 'Janvier' },
        { number: 1, name: 'Février' },
        { number: 2, name: 'Mars' },
        { number: 3, name: 'Avril' },
        { number: 4, name: 'Mai' },
        { number: 5, name: 'Juin' },
        { number: 6, name: 'Juillet' },
        { number: 7, name: 'Août' },
        { number: 8, name: 'Septembre' },
        { number: 9, name: 'Octobre' },
        { number: 10, name: 'Novembre' },
        { number: 11, name: 'Décembre' },
      ],
      weekdays: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    };
  },
  methods: {
    getDaysInMonth(month) {
      const firstDay = new Date(this.currentYear, month, 1).getDay(); // Jour de la semaine du 1er du mois (0 = Dimanche, 1 = Lundi, etc.)
      const daysInMonth = new Date(this.currentYear, month + 1, 0).getDate(); // Nombre de jours dans le mois

      const days = [];
      // Ajoutez des espaces vides pour aligner correctement les jours
      for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
        days.push(null);
      }

      // Ajoutez les jours du mois
      for (let day = 1; day <= daysInMonth; day++) {
        days.push(day);
      }

      return days;
    },
    filterEventsByDate(month, day) {
      return this.events.filter(event => {
        const eventDate = new Date(event.datefin);
        const localYear = eventDate.getUTCFullYear();
        const localMonth = eventDate.getUTCMonth();
        const localDay = eventDate.getUTCDate();
        return (
          localYear === this.currentYear &&
          localMonth === month &&
          localDay === day
        );
      });
    },
    changeYear(direction) {
      // Modifie l'année en cours
      this.currentYear += direction;
    },
    viewEventDetails(month, day) {
      this.selectedDay = day;
      this.selectedMonthName = this.months[month].name;
      this.eventsForSelectedDate = this.filterEventsByDate(month, day);
      this.showModal = true;
    },
    formatDate(date) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
      return new Date(date).toLocaleDateString('fr-FR', options);
    },
    closeModal() {
      this.showModal = false;
      this.showEventForm = false;
    },
    editEvent(event) {
      // Ouvrir le formulaire avec les données de l'événement à modifier
      this.tempEvent = { ...event };
      this.isEditing = true;
      this.showEventForm = true;
      this.showModal = false;
    },
    async getArt() {
        try {
          const response = await axios.get("http://localhost:3000/getArt");
          this.events = response.data;
          this.events = response.data.map(event => ({
            ...event,
            type: 'renouvellement'
          }));
          console.log("tyh e");
          console.log(this.events);
          
        } catch (error) {
          alert("Erreur lors de la récupération des arts:"+ error);
        }
      },
    async saveEvent(payement) {
      payement.id = this.tempEvent.id;
      payement.date = this.tempEvent.datefin;
      console.log(payement.date);
      
    // Validation des champs
      if (!payement.cardNumber || !payement.mois) {
        alert("Veuillez remplir tous les champs.");
        return;
      }

      // Validation du numéro de carte (16 chiffres)
      if (!this.validateCardNumber(payement.cardNumber)) {
        alert("Numéro de carte invalide.");
        return;
      }

      // Traitement de la logique de paiement
      try {
        // Exemple d'appel API pour traitement de paiement (remplacer par une vraie API de paiement)
        const response = await axios.post("http://localhost:3000/amm/payement", payement);
        
        if (response.status === 200) {
          alert("Paiement effectué avec succès !");
          this.closeModal();
        } else {
          alert("Erreur lors du paiement. Essayez à nouveau.");
        }
        
        this.events = response.data;
        console.log(this.events);
        
          this.events = response.data.map(event => ({
            ...event,
            type: 'renouvellement'
          }));
      } catch (error) {
        console.error("Erreur de paiement :", error);
        alert("Erreur lors du traitement du paiement.");
      }
    },

    // Fonction pour valider le numéro de la carte
    validateCardNumber(cardNumber) {
      const regex = /^[0-9]{16}$/; // Validation pour un numéro de carte de 16 chiffres
      return regex.test(cardNumber);
    },
  },
  mounted() {
    this.getArt(); // Charger les données au montage du composant
  },
};
</script>

<style>
.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* 7 jours par semaine */
  text-align: center;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 10px;
}
.day.empty {
  background-color: transparent;
  border: none;
  pointer-events: none;
}

.weekday {
  padding: 5px;
  font-size: 1rem;
  border-bottom: 1px solid #e0e0e0;
}

/* Ajoute un style pour les boutons de navigation */
.year-navigation {
  text-align: center;
  margin: 20px 0;
}

.year-navigation button {
  padding: 10px 15px;
  margin: 0 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.year-navigation button:hover {
  background-color: #2980b9;
}
/* Conteneur principal pour le calendrier */
.calendar-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px;
  width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2,1fr);
}

/* Style de chaque mois */
.month {
  width: 90%;
  background: #fff;
  padding: 15px;
  margin: 10px 0;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.month h3 {
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

/* Style pour les jours */
.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* 7 jours par semaine */
  gap: 5px;
  margin-top: 10px;
}

.day {
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  position: relative;
}

.day-number {
  font-weight: bold;
  font-size: 1.2rem;
  color: #2c3e50;
}

.event {
  background-color: rgba(52, 152, 219, 0.2);
  color: #3498db;
  padding: 5px;
  border-radius: 5px;
  font-size: 0.9rem;
  margin-top: 5px;
}

.event.renouvellement {
  background-color: rgba(40, 167, 69, 0.2);
  color: #28a745;
}

.event.annuite {
  background-color: rgba(241, 196, 15, 0.2);
  color: #f39c12;
}

.event.opposition {
  background-color: rgba(231, 76, 60, 0.2);
  color: #e74c3c;
}

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.modal-content label {
  display: block;
  margin: 10px 0;
  font-size: 1rem;
}

.modal-content input,
.modal-content select {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-top: 5px;
}

.modal-content button {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  margin-top: 15px;
  cursor: pointer;
}

.modal-content button:hover {
  background-color: #2980b9;
}
</style>
