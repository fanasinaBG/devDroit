<template>
  <div class="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
    <h2 class="text-2xl font-bold mb-4">Contactez-nous</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">E-mail</label>
        <input
          v-model="form.email"
          type="email"
          id="email"
          placeholder="Entrez votre e-mail"
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
      </div>  
      <div class="mb-4">
        <label for="mdp" class="block text-sm font-medium text-gray-700">Mot de passe</label>
        <input
          v-model="form.mdp"
          type="password"
          id="mdp"
          placeholder="Entrez votre mot de passe"
          class="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <span v-if="errors.mdp" class="text-red-500 text-sm">{{ errors.mdp }}</span>
      </div>
      <button
        type="submit"
        class="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
      >
        Envoyer
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        mdp: '',
        email: ''
      },
      errors: {
        mdp: '',
        email: ''
      },
      users: [] 
    };
  },
  methods: {
    validateForm() {
      this.errors.mdp = this.form.mdp ? '' : 'Le mot de passe est requis';
      this.errors.email = this.form.email ? '' : 'L\'e-mail est requis';

      if (this.form.email && !/\S+@\S+\.\S+/.test(this.form.email)) {
        this.errors.email = 'L\'e-mail est invalide';
      }

      return !Object.values(this.errors).some((error) => error);
    },

    async getUsers() {
      try {
        const response = await axios.get('http://localhost:3000/getUsers');
        this.users = response.data;
        console.log("Utilisateurs récupérés:", JSON.stringify(this.users));
      } catch (error) {
        console.error('Erreur de récupération des utilisateurs:', error);
      }
    },

    submitForm() {
      if (this.validateForm()) {
        const email = this.form.email.trim();
        const mdp = this.form.mdp.trim();
        this.getUsers().then(() => {
          const user = this.users.find(
            (u) => u.email === this.form.email.trim().toLowerCase() && u.mdp === this.form.mdp.trim()
          );
          console.log('lusrs est:',user);
          
          console.log('mdp recuperer est:',this.form.mdp);
          
          console.log('le email recuperer est:',this.form.email );

          if (user) {
            //tehirizina anaty session
            sessionStorage.setItem('user', JSON.stringify(user));
            alert('Connexion réussie !');
          } else {
            this.errors.email = 'Identifiants incorrects.';
          }
        });
      }
    }
  },

  created() {
    this.getUsers();
  }
};
</script>

<style scoped>
/* Ajoutez des styles si nécessaire */
</style>
