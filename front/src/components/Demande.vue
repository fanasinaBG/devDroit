<script>
import axios from 'axios';
export default {
  data(){
    return {
        art:[],
        user: null,
    };
  },
  methods:{
    async getArt() {
      try {
        const response = await axios.get('http://localhost:3000/getArt');
        this.art = response.data; // Assigner les catégories récupérées
        console.log('le reponse est:',response.data);
      } catch (error) {
        console.error('Erreur de récupération des catégories:', error);
      }
    },
    async uploadDemande(id, iduser){
        console.log('artid:', id);
        console.log('idUserDMD:', iduser);
        console.log('idUserDM:', this.user.id);
        if(id===null){
            alert('Veuillez sélectionner un partid avant de soumettre.');
            return;
        }
        if(iduser===null){
            alert('Veuillez sélectionner un iduser avant de soumettre.');
            return;
        }

        if(this.user.id === null){
            alert('Veuillez sélectionner un iduserDM avant de soumettre.');
            return;
        }
        const datas={
            artid: id,
            idUserDMD: iduser,
            idUserDM: this.user.id,
        }

        console.log('les datas envoyer:',datas);

        try {
        const response = await axios.post('http://localhost:3000/getDemande', datas, {
          headers: {
            'Content-Type': 'application/json', // Spécifie le type de contenu
          },
        });
        console.log('Réponse du serveur:', response.data);
        alert('Données envoyées avec succès !');
      } catch (error) {
        console.error('Erreur lors de l\'envoi des données:', error);
        alert('Erreur lors de l\'envoi des données.');
      }
    }
  },
  mounted(){
    const userData = sessionStorage.getItem('user');
    console.log('userData:',userData);
    if (userData) {
      this.user = JSON.parse(userData);
    }
    this.getArt();
  },
}
</script>

<template>
    <div>
      <h2>liste des arts</h2>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>iduser</th>
            <th>Nom du art</th>
            <th>Catégorie</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="arts in art" :key="arts.id">
            <td :data-id="arts.id">{{ arts.id }}</td>
            <td>{{ arts.iduser }}</td>
            <td>{{ arts.nom }}</td>
            <td>{{ arts.idcategories}}</td>
            <!-- <td>
              <select id="pays-select" v-model="selectedPays" class="pays-select">
                <option value="" disabled>Sélectionner une pay</option>
                  <option v-for="Pay in Pays" :key="Pay.id" :value="Pay.id">
                  {{ Pay.name }}
                </option>
              </select>
            </td> -->
             <td>
              <button @click="uploadDemande(arts.id,arts.iduser)">demander</button>
          </td>
          <!--<td>{{ category.id }}</td> -->
          </tr>
        </tbody>
      </table>
    </div>
</template>