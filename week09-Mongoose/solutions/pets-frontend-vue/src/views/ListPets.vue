<template>
 <div>
   <h1>Pets</h1>
   <table id="pets" class="ui celled compact table">
     <thead>
       <tr>
         <th> Name </th>
         <th> Species </th>
         <th> Breed </th>
         <th> Age </th>
         <th> Colour or markings</th>
       </tr>
     </thead>
     <tr v-for="(pet, i) in pets" :key="i">
       <td>{{ pet.name }}</td>
       <td>{{ pet.species }}</td>
       <td>{{ pet.breed }} </td>
       <td>{{ pet.age }} </td>
       <td>{{ pet.colour }}</td>
     </tr>
   </table>
 </div>
</template>
 
<script>
import { api } from '../helpers/helpers';
export default {
    name: 'pets',
    data() {
        return {
            pets: []
        };
    },
    async mounted() {
        this.pets = await api.getpets();
        console.log("Fetch " + JSON.stringify(this.pets.data) );
    }
};
</script>