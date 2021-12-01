<template>
 <div>
   <h1>Users</h1>
   <table id="users" class="ui celled compact table">
     <thead>
       <tr>
          <th> User id </th>
          <th> Username </th>
          <th> Animals </th>
       </tr>
     </thead>
     <tr v-for="(user, i) in users" :key="i">
       <td>{{ user._id }}</td>
       <td>{{ user.username }}</td>
       <td>{{ user.animals }}</td>
     </tr>
   </table>
 </div>
</template>
 
<script>
import { api } from '../helpers/helpers';
export default {
    name: 'users',
    data() {
        return {
            users: []
        };
    },
    async mounted() {
        this.users = await api.getusers();
        console.log("Fetch " + JSON.stringify(this.users) );
    }
};
</script>