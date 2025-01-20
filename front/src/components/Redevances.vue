<template>
    <div>
      <h2>Calcul des Redevances</h2>
      <form @submit.prevent="calculerRedevance">
        <label for="idContrat">ID Contrat:</label>
        <input type="number" v-model="idContrat" required />
  
        <button type="submit">Calculer</button>
      </form>
  
      <div v-if="montantRedevance !== null">
        <p>Redevance à percevoir : {{ montantRedevance }} EUR</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        idContrat: "",
        montantRedevance: null
      };
    },
    methods: {
      async calculerRedevance() {
        try {
          const response = await axios.post("http://localhost:3000/amm/calculerredevances", {
            idContrat: this.idContrat
          });
          this.montantRedevance = response.data.montantRedevance;
        } catch (error) {
          console.error("Erreur lors du calcul des redevances", error);
        }
      }
    }
  };
  </script>
  