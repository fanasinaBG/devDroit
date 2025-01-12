<template>
    <div class="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 class="text-2xl font-bold mb-4">Contactez-nous</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Nom</label>
          <input
            v-model="form.name"
            type="text"
            id="name"
            placeholder="Entrez votre nom"
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</span>
        </div>
  
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
          <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            v-model="form.message"
            id="message"
            placeholder="Entrez votre message"
            class="w-full px-3 py-2 border border-gray-300 rounded-md"
            rows="4"
          ></textarea>
          <span v-if="errors.message" class="text-red-500 text-sm">{{ errors.message }}</span>
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
          name: '',
          email: '',
          message: ''
        },
        errors: {
          name: '',
          email: '',
          message: ''
        }
      };
    },
    methods: {
      validateForm() {
        this.errors.name = this.form.name ? '' : 'Le nom est requis';
        this.errors.email = this.form.email ? '' : 'L\'e-mail est requis';
        this.errors.message = this.form.message ? '' : 'Le message est requis';
  
        if (this.form.email && !/\S+@\S+\.\S+/.test(this.form.email)) {
          this.errors.email = 'L\'e-mail est invalide';
        }
  
        return !Object.values(this.errors).some((error) => error);
      },
      submitForm() {
        if (this.validateForm()) {
          console.log('Formulaire soumis:', this.form);
          alert('Formulaire soumis avec succès');
          this.form.name = '';
          this.form.email = '';
          this.form.message = '';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Ajoutez des styles si nécessaire */
  </style>
  