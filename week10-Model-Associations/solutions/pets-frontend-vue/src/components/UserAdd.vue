<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="username">Username</label>
        <input
            type="text"
            class="form-control"
            id="username"
            required
            v-model="user.username"
            name="username"
        />
      </div>
      <button @click="saveUser" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newUser">Add</button>
    </div>
  </div>
</template>

<script>
import UserDataService from "../services/UserDataService";

export default {
  name: "user-add",
  data() {
    return {
      user: {
        _id: null,
        username: ''
      },
      submitted: false
    };
  },
  methods: {
    saveUser() {
      var data = {
        username: this.user.username
      };

      UserDataService.create(data)
          .then(response => {
            this.user._id = response.data._id;
            console.log(response.data);
            this.submitted = true;
          })
          .catch(e => {
            console.log(e);
          });
    },

    newUser() {
      this.submitted = false;
      this.user = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>