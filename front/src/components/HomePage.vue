<script>
import axios from 'axios';
export default {
  data() {
    return {
      user: null, // Stocke les informations de l'utilisateur récupérées depuis la session
      selectedFiles: [],
      categories: [],
      selectedMenu: null, // Nouvelle variable pour suivre l'élément du menu sélectionné
      menuItems: [
        { id: 1, name: 'Enregistrement', path: '/home' },
        { id: 2, name: 'Echéances et alertes', path: '/echeance' },
        { id: 3, name: 'Gestion', path: '/Gestion' },
        { id: 4, name: 'Rapports et analyses ', path: '/Rapports' },
        { id: 5, name: 'Consultation juridique  ', path: '/consultation' },
      ],
    };
  },
  methods: {
    handleFileUpload(event) {
      const files = event.target.files;
      this.selectedFiles = Array.from(files); // Convertir la FileList en un tableau
    },
    // Envoie les fichiers sélectionnés au serveur
    async uploadFiles() {
      if (this.selectedFiles.length === 0) {
        alert('Veuillez sélectionner un fichier avant de soumettre.');
        return;
      }

      const formData = new FormData();

      this.selectedFiles.forEach((file) => {
        formData.append('files', file); // Ajoute chaque fichier dans FormData
      });

      try {
        const response = await axios.post('http://votre-serveur/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Spécifie le type de contenu
          },
        });
        console.log('Réponse du serveur:', response.data);
      } catch (error) {
        console.error('Erreur lors de l\'upload:', error);
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get('http://localhost:3000/getCategories');
        this.categories = response.data; // Assigner les catégories récupérées
        console.log('le reponse est:',response.data);
      } catch (error) {
        console.error('Erreur de récupération des catégories:', error);
      }
    },
    selectMenu(item) {
      this.selectedMenu = item.id; // Met à jour l'élément sélectionné
    }
  }, // Il manque une virgule ici après `selectMenu` pour fermer la méthode
  mounted() {
    // Récupérer les données de sessionStorage
    const userData = sessionStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
    this.fetchCategories();
  },
};
</script>


<template>
  <div>
    <h1>Bienvenue sur la page d'accueil</h1>
    <p v-if="user">
      Vous êtes connecté en tant que <strong>{{ user.name }}</strong> (<em>{{ user.email }}</em>).
    </p>
    <p v-else>
      Vous n'êtes pas connecté.
    </p>
  </div>

  <!-- Menu -->
  <div class="menu-container">
    <ul class="menu">
      <li v-for="item in menuItems" :key="item.id" class="menu-item">
        <router-link :to="item.path" class="menu-link" @click="selectMenu(item)">
          {{ item.name }}
        </router-link>
      </li>
    </ul>
  </div>

  <!-- Formulaire d'upload, visible uniquement si 'Enregistrement' est sélectionné -->
  <div v-if="selectedMenu === 1" class="file-upload-container">
  <h2 class="title">Uploader des fichiers</h2>

  <!-- Input file -->
  <div class="file-input-container">
    <label for="file-upload" class="file-input-label">Choisir des fichiers</label>
    <input
      type="file"
      id="file-upload"
      @change="handleFileUpload"
      multiple
      class="file-input"
    />
  </div>

  <!-- Selected files list -->
  <div v-if="selectedFiles.length > 0" class="file-list">
    <h3 class="file-list-title">Fichiers sélectionnés :</h3>
    <ul class="file-list-items">
      <li v-for="(file, index) in selectedFiles" :key="index" class="file-item">
        {{ file.name }} - {{ file.type }} - {{ file.size }} bytes
      </li>
    </ul>
  </div>

  <!-- Upload button -->
  <button @click="uploadFiles" class="upload-button">
    Uploader les fichiers
  </button>
   <!-- Input number -->
   <div class="number-input-container">
    <label for="file-quantity" class="number-input-label">durer de votre contrart :</label>
    <input
      type="number"
      id="file-quantity"
      v-model="fileQuantity"
      class="number-input"
      min="1"
    />
  </div>
  <div class="category-select-container">
      <label for="category-select" class="category-select-label">Sélectionner une catégorie :</label>
      <select id="category-select" v-model="selectedCategory" class="category-select">
        <option value="" disabled>Sélectionner une catégorie</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </div>
</div>

</template>

<style scoped>
.menu-container {
  width: 200px;
  height: 500px;
  background-color: #2c3e50;
  padding-top: 20px;
  border-radius: 8px;
  margin-left: -670px;
  margin-top: 10px;
}

.menu {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  margin-bottom: 30px;
}

.menu-link {
  display: block;
  padding: 15px;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.menu-link:hover {
  background-color: #3498db;
}

/* Container principal */
.file-upload-container {
  background-color: #bdbdbd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  margin-top: -500px;
  margin-left: -200px;
}

/* Titre */
.title {
  text-align: center;
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
}

/* Conteneur du champ de fichier */
.file-input-container {
  margin-bottom: 20px;
}

/* Label du champ de fichier */
.file-input-label {
  display: block;
  font-size: 1rem;
  color: #555;
  margin-bottom: 8px;
}

/* Champ de fichier */
.file-input {
  display: block;
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #fafafa;
  color: #333;
  transition: border-color 0.3s;
}

.file-input:focus {
  border-color: #3498db;
  outline: none;
}

/* Liste des fichiers sélectionnés */
.file-list {
  margin-top: 20px;
}

.file-list-title {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 10px;
}

.file-list-items {
  list-style-type: disc;
  padding-left: 20px;
}

.file-item {
  color: #555;
  font-size: 1rem;
  margin-bottom: 8px;
}

/* Bouton d'upload */
.upload-button {
  width: 100%;
  padding: 12px;
  background-color: #3498db;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.upload-button:hover {
  background-color: #2980b9;
}

</style>
