<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{content}}</h3>
    </header>
  </div>
</template>

<script>
import TestDataService from '../services/TestDataService';

export default {
  name: 'Public',
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    TestDataService.getPublicContent().then(
        response => {
          this.content = response.data;
        },
        error => {
          this.content =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
        }
    );
  }
};
</script>