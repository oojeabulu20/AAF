<template>
  <div id="app">
    <div>
      <router-link to="/users/new" exact>
        New user
      </router-link>
      <router-link to="/users" exact >
        List Users
      </router-link>
      <router-link to="/pets/new" exact>
        New pet
      </router-link>
      <router-link to="/pets" exact >
        List Pets
      </router-link>
    </div>
    <div>
      <div class="column">
        <router-view />
      </div> 
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
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
