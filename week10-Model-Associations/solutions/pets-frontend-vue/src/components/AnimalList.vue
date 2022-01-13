<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by name"
          v-model="name"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchName"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Animals List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(animal, index) in animals"
          :key="index"
          @click="setActiveAnimal(animal, index)"
        >
          {{ animal.name }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllAnimals">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentAnimal">
        <h4>Animal</h4>
        <div>
          <label><strong>Name:</strong></label> {{ currentAnimal.name }}
        </div>
        <div>
          <label><strong>Species:</strong></label> {{ currentAnimal.species }}
        </div>
        <div>
          <label><strong>Breed:</strong></label> {{ currentAnimal.breed }}
        </div>
        <div>
          <label><strong>Age:</strong></label> {{ currentAnimal.age }}
        </div>
        <div>
          <label><strong>Colour:</strong></label> {{ currentAnimal.colour }}
        </div>

        <a 
          :href="'/animals/' + currentAnimal._id"
        >
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on an Animal ...</p>
      </div>
    </div>
  </div>
</template>

<script>
import AnimalDataService from "../services/AnimalDataService";

export default {
  name: "animals-list",
  data() {
    return {
      animals: [],
      currentAnimal: null,
      currentIndex: -1,
      name: ""
    };
  },
  methods: {
    retrieveAnimals() {
      AnimalDataService.getAll()
        .then(response => {
          this.animals = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveAnimals();
      this.currentAnimal = null;
      this.currentIndex = -1;
    },

    setActiveAnimal(animal, index) {
      this.currentAnimal = animal;
      this.currentIndex = index;
    },

    removeAllAnimals() {
      AnimalDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchName() {
      AnimalDataService.findByName(this.name)
        .then(response => {
          this.animals = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveAnimals();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>