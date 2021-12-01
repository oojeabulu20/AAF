<template>
<form action="#" @submit.prevent="onSubmit">
   <p v-if="errorsPresent" class="error">Please fill out all fields!</p>
   Userid <input type="text" placeholder="Enter user id" v-model="pet.userid" />
   <br/>
   Name <input type="text" placeholder="Enter name..." v-model="pet.name" />
   <br/>
   Species <input type="text" placeholder="Enter species..." v-model="pet.species" />
   <br/>
   Breed
   <input type="text" placeholder="Enter breed..." v-model="pet.breed" />
   <br/>
   Age
   <input type="text" placeholder="Enter age..." v-model="pet.age" />
   <br/>
   Colour or markings <input type="text" placeholder="Enter colour..." v-model="pet.colour" />
   <br/>
   <button class="positive ui button">Submit</button>
 </form>
</template>
 
<script>
export default {
 name: 'pet-form',
 props: {
   pet: {
     type: Object,
     required: false,
     default: () => {
       return {
         userid: '',
         name: '',
         species: '',
         breed: '',
         age: '',
         colour: ''
       };
     }
   }
 },
 data() {
   return {
     errorsPresent: false
   };
 },
 methods: {
   onSubmit: function() {
     if (this.pet.userid == '' || this.pet.name === '' || this.pet.species === '' || this.pet.breed === ''
           || this.pet.age === '' || this.pet.colour === '') {
       this.errorsPresent = true;
     } else {
       this.$emit('createOrUpdate', this.pet);
     }
   }
 }
};
</script>
 
<style scoped>
.error {
 color: red;
}
</style>