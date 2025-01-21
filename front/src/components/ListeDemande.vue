<script>
import axios from 'axios';
    export default {
        data(){
            return{
                listeDemande:[],
            };
        },
        methods:{
            async getDemande(){
                try {
                    const userId = this.user.id; // Par exemple, ici 1 comme valeur de userId
                    console.log('user id est :',userId, 'son type est',typeof str);
                    const id=parseInt(userId);
                    console.log('id type:',id);
                    const response = await axios.get(`http://localhost:3000/DemandeVue/${id}`);
                    this.listeDemande = response.data; 
                    console.log('le reponse est:',response.data);
                } catch (error) {
                    console.error('Erreur de récupération des demande:', error);
                }
            },
            updateDemande(demande_id){
                const idDmd=demande_id;
                console.log('id dem est:',idDmd);
                sessionStorage.setItem('idDmd', JSON.stringify(idDmd));
            }
        },
        mounted() {
            const userData = sessionStorage.getItem('user');
                if (userData) {
                this.user = JSON.parse(userData);
                }
            this.getDemande();
        }
    }
</script>

<template>
 <div>
      <h2>liste des demandes</h2>
      <table>
        <thead>
          <tr>
            <th>demandeur</th>
            <th>chose a demander</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="liste in listeDemande" :key="liste.demande_id">
            <!-- <td :data-id="arts.id">{{ arts.id }}</td> -->
            <td>{{ liste.user_dm_nom }}</td>
            <td>{{ liste.art_nom }}</td>
            <!-- <td>
              <select id="pays-select" v-model="selectedPays" class="pays-select">
                <option value="" disabled>Sélectionner une pay</option>
                  <option v-for="Pay in Pays" :key="Pay.id" :value="Pay.id">
                  {{ Pay.name }}
                </option>
              </select>
            </td> -->
             <td>
              <button @click="updateDemande(liste.demande_id)">valider</button>
          </td>
          <!--<td>{{ category.id }}</td> -->
          </tr>
        </tbody>
      </table>
    </div>
</template>