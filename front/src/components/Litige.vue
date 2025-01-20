<script>
  import axios from "axios";
  
  export default {
    name: "Litiges",
    data() {
      return {
        litiges: [], // Tableau pour stocker les litiges
      };
    },
    methods: {
      // Récupérer la liste des litiges depuis l'API
      async fetchLitiges() {
        try {
          const response = await axios.get("http://localhost:3000/amm/litigesdetails");
          this.litiges = response.data; // Stocker les données dans le tableau
          console.log(this.litiges);
        } catch (error) {
          console.error("Erreur lors de la récupération des litiges :", error);
          alert("Impossible de récupérer les données. Veuillez réessayer plus tard.");
        }
      },
    },
    mounted() {
      this.fetchLitiges(); // Charger les données au montage du composant
    },
  };
  </script>
<template>
    <div class="litiges">
      <h1>Liste des Litiges</h1>
      <table border="1" class="litiges-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Art 1</th>
            <th>Art 2</th>
            <th>Description</th>
            <th>Date Début</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="litige in litiges" :key="litige.id">
            <td>{{ litige.litigeid }}</td>
            <td>{{ litige.article1nom }}</td>
            <td>{{ litige.article2nom }}</td>
            <td>{{ litige.litigedescription }}</td>
            <td>{{ litige.litigedatedebut }}</td>
            <td>{{ litige.litigestatut }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  <style scoped>
  .litiges {
    font-family: Arial, sans-serif;
    margin: 20px;
  }
  
  .litiges-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }
  
  .litiges-table th,
  .litiges-table td {
    padding: 10px;
    border: 1px solid #ddd;
  }
  
  .litiges-table th {
    background-color: #f4f4f4;
  }
  </style>
  