<template>
 <div>
   <h1>New Pet</h1>
   <pet-form @createOrUpdate="createOrUpdate"></pet-form>
 </div>
</template>
 
<script>
import petForm from '../components/PetForm.vue';
import { api } from '../helpers/helpers';
export default {
 name: 'new-pet',
 components: {
   'pet-form': petForm
 },
 methods: {
   createOrUpdate: async function(pet) {
     const res = await api.createpet(pet);
     if (res.success === true)
        this.flash('pet created', 'success');
     this.$router.push(`/pets/`);
   }
 }
};
</script>
