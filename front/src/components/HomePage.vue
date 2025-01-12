<script>
export default {
  data() {
    return {
      user: null, // Stocke les informations de l'utilisateur récupérées depuis la session
    };
  },
  mounted() {
    // Récupérer les données de sessionStorage
    const userData = sessionStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
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
  </template>
  
  <style scoped>
  /* Ajoutez des styles si nécessaire */
  </style>
  