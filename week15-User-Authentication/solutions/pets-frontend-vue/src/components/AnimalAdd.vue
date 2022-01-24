<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="userid">UserId</label>
        <input
            type="text"
            class="form-control"
            id="userid"
            required
            v-model="animal.userid"
            name="userid"
        />
      </div>

      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="animal.name"
          name="name"
        />
      </div>

      <div class="form-group">
        <label for="species">Species</label>
        <input
          class="form-control"
          id="species"
          required
          v-model="animal.species"
          name="species"
        />
      </div>

      <div class="form-group">
        <label for="breed">Breed</label>
        <input
          class="form-control"
          id="breed"
          required
          v-model="animal.breed"
          name="breed"
        />
      </div>

      <div class="form-group">
        <label for="age">Age</label>
        <input
          class="form-control"
          id="age"
          required
          v-model="animal.age"
          name="age"
        />
      </div>

      <div class="form-group">
        <label for="colour">Colour</label>
        <input
          class="form-control"
          id="colour"
          required
          v-model="animal.colour"
          name="colour"
        />
      </div>

      <button @click="saveAnimal" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newAnimal">Add</button>
    </div>
  </div>
</template>

<script>
import AnimalDataService from "../services/AnimalDataService";

export default {
  name: "animal-add",
  data() {
    return {
      animal: {
        _id: null,
        userid: '',
        name: '',
        species: '',
        breed: '',
        age: '',
        colour: ''
      },
      submitted: false
    };
  },
  methods: {
    saveAnimal() {
      var data = {
          userid: this.animal.userid,
          name: this.animal.name,
          species: this.animal.species,
          breed: this.animal.breed,
          age: this.animal.age,
          colour: this.animal.colour
      };

      AnimalDataService.create(data)
        .then(response => {
          this.animal._id = response.data._id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newAnimal() {
      this.submitted = false;
      this.animal = {};
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