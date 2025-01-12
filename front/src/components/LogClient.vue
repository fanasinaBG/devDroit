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
          <label for="mdp" class="block text-sm font-medium text-gray-700">mots de passe</label>
          <input
            v-model="form.mdp"
            type="text"
            id="mdp"
            placeholder="Entrez votre mots de passe"
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
        }
      };
    },
    methods: {
      validateForm() {
        this.errors.name = this.form.mdp ? '' : 'Le nom est requis';
        this.errors.email = this.form.email ? '' : 'L\'e-mail est requis';
  
        if (this.form.email && !/\S+@\S+\.\S+/.test(this.form.email)) {
          this.errors.email = 'L\'e-mail est invalide';
        }
  
        return !Object.values(this.errors).some((error) => error);
      },
      submitForm() {
        if (this.validateForm()) {
          console.log('Formulaire soumis:', this.form);
          alert('Formulaire soumis avec succès');
          this.form.mdp = '';
          this.form.email = '';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Ajoutez des styles si nécessaire */
  </style>
  