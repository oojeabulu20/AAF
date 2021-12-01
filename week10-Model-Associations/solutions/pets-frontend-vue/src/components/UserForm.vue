<template>
<form action="#" @submit.prevent="onSubmit">
   <p v-if="errorsPresent" class="error">Please fill out all fields!</p>
   Username <input type="text" placeholder="Enter username" v-model="user.username" />
   <br/>
   <button class="positive ui button">Submit</button>
 </form>
</template>
 
<script>
export default {
 name: 'user-form',
 props: {
   user: {
     type: Object,
     required: false,
     default: () => {
       return {
         username: ''
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
     if (this.user.username == '' ) {
       this.errorsPresent = true;
     } else {
       this.$emit('createOrUpdate', this.user);
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