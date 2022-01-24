<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand">Petshop</router-link>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/animals" class="nav-link">Animals</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add-animal" class="nav-link">Add Animal</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/users" class="nav-link">List Users</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add-users" class="nav-link">Add Users</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/public" class="nav-link">
            <font-awesome-icon icon="home" />Public
          </router-link>
        </li>
        <li v-if="protectedContent" class="nav-item">
          <router-link to="/protectedcontent" class="nav-link">Protected</router-link>
        </li>
      </div>
      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" />Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" />Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" />LogOut
          </a>
        </li>
      </div>

    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    protectedContent() {
      return (this.currentUser?true:false);
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
