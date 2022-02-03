<template>
  <div v-if="currentUser" class="edit-form">
    <h4>User</h4>
    <form>
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" class="form-control" id="username"
               v-model="currentUser.username"
        />
      </div>
      <div class="form-group">
        <label for="animals">Animals</label>
        <input type="text" class="form-control" id="animals"
               v-model="currentUser.animals"
        />
      </div>
    </form>

    <button class="badge badge-danger mr-2"
            @click="deleteUser"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
            @click="updateUser"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a User...</p>
  </div>
</template>

<script>
import UserDataService from "../services/UserDataService";

export default {
  name: "user",
  data() {
    return {
      currentUser: null,
      message: ''
    };
  },
  methods: {
    getUser(id) {
      UserDataService.get(id)
          .then(response => {
            this.currentUser = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },

    updateUser() {
      UserDataService.update(this.currentUser._id, this.currentUser)
          .then(response => {
            console.log(response.data);
            this.message = 'The user was updated successfully!';
          })
          .catch(e => {
            console.log(e);
          });
    },

    deleteUser() {
      UserDataService.delete(this.currentUser._id)
          .then(response => {
            console.log(response.data);
            this.$router.push({ name: "users" });
          })
          .catch(e => {
            console.log(e);
          });
    }
  },
  mounted() {
    this.message = '';
    this.getUser(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>