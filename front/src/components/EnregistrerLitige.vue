<template>
    <div class="contrats">
      <h1>Contrats de Licence</h1>
  
      <h2>Liste des Contrats</h2>
      <table>
        <thead>
          <tr>
            <th>Objet</th>
            <th>Date de Début</th>
            <th>Date de Fin</th>
            <th>Territoire</th>
            <th>Type de Licence</th>
            <th>Statut de Demande</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contrat in contrats" :key="contrat.id">
            <td>{{ contrat.objet }}</td>
            <td>{{ contrat.date_debut }}</td>
            <td>{{ contrat.date_fin }}</td>
            <td>{{ contrat.territoire }}</td>
            <td>{{ contrat.type_licence }}</td>
            <td>{{ contrat.statut_demande }}</td>
            <td>
              <button @click="supprimerContrat(contrat.id)">Supprimer</button>
              <button @click="modifierContrat(contrat)">Modifier</button>
            </td>
          </tr>
        </tbody>
      </table>
  
      <h2>{{ isEditing ? 'Modifier un Contrat' : 'Créer un Nouveau Contrat' }}</h2>
      <form @submit.prevent="isEditing ? modifierContratAction() : creerContrat">
        <div>
          <label for="objet">Objet</label>
          <input type="text" v-model="nouveauContrat.objet" required />
        </div>
        <div>
          <label for="date_debut">Date de Début</label>
          <input type="date" v-model="nouveauContrat.date_debut" required />
        </div>
        <div>
          <label for="date_fin">Date de Fin</label>
          <input type="date" v-model="nouveauContrat.date_fin" />
        </div>
        <div>
          <label for="territoire">Territoire</label>
          <input type="text" v-model="nouveauContrat.territoire" required />
        </div>
        <div>
          <label for="type_licence">Type de Licence</label>
          <select v-model="nouveauContrat.type_licence" required>
            <option value="Exclusive">Exclusive</option>
            <option value="Non-Exclusive">Non-Exclusive</option>
          </select>
        </div>
        <div>
          <label for="statut_demande">Statut de la Demande</label>
          <select v-model="nouveauContrat.statue" required>
            <option value="En Attente">En Attente</option>
            <option value="Validée">Validée</option>
            <option value="Refusée">Refusée</option>
          </select>
        </div>
        <div>
          <label for="iduserProp">ID Propriétaire</label>
          <input type="number" v-model="nouveauContrat.iduserProp" required />
        </div>
        <div>
          <label for="idUserDM">ID Demandeur</label>
          <input type="number" v-model="nouveauContrat.idUserDM" required />
        </div>
        <button type="submit">{{ isEditing ? 'Modifier' : 'Créer le Contrat' }}</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        contrats: [],
        nouveauContrat: {
          objet: "",
          date_debut: "",
          date_fin: "",
          territoire: "",
          type_licence: "Exclusive",
          statue: "En Attente",  // Champ pour le statut de la demande
          iduserProp: null,
          idUserDM: null,
        },
        isEditing: false, // Pour vérifier si on est en mode modification
        contratToEdit: null, // Pour stocker le contrat à modifier
      };
    },
    created() {
      this.fetchContrats();
    },
    methods: {
      async fetchContrats() {
        try {
          const response = await axios.get("http://localhost:3000/amm/contrats");
          this.contrats = response.data;
        } catch (error) {
          console.error("Erreur lors de la récupération des contrats:", error);
        }
      },
      async creerContrat() {
        try {
          await axios.post("http://localhost:3000/amm/contrats", this.nouveauContrat);
          this.fetchContrats(); // Rafraîchit la liste des contrats après la création
          this.resetForm(); // Réinitialise le formulaire
        } catch (error) {
          console.error("Erreur lors de la création du contrat:", error);
        }
      },
      async supprimerContrat(id) {
        try {
          await axios.delete(`http://localhost:3000/amm/contrats/${id}`);
          this.fetchContrats(); // Rafraîchit la liste des contrats après la suppression
        } catch (error) {
          console.error("Erreur lors de la suppression du contrat:", error);
        }
      },
      modifierContrat(contrat) {
        // Pré-remplir les champs du formulaire avec les données du contrat
        this.nouveauContrat = { ...contrat };
        this.isEditing = true; // Passer en mode édition
        this.contratToEdit = contrat.id; // Conserver l'ID du contrat à modifier
      },
      async modifierContratAction() {
        try {
          await axios.put(`http://localhost:3000/amm/contrats/${this.contratToEdit}`, this.nouveauContrat);
          this.fetchContrats(); // Rafraîchit la liste des contrats après la modification
          this.resetForm(); // Réinitialise le formulaire
          this.isEditing = false; // Repasser en mode création
        } catch (error) {
          console.error("Erreur lors de la modification du contrat:", error);
        }
      },
      resetForm() {
        this.nouveauContrat = {
          objet: "",
          date_debut: "",
          date_fin: "",
          territoire: "",
          type_licence: "Exclusive",
          statut_demande: "En Attente",
          iduserProp: null,
          idUserDM: null,
        };
        this.isEditing = false;
        this.contratToEdit = null;
      },
    },
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  table th, table td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  form {
    margin-top: 20px;
  }
  
  form div {
    margin-bottom: 10px;
  }
  
  form label {
    display: block;
  }
  
  form input, form select {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
  }
  
  button {
    margin-top: 10px;
    padding: 8px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  