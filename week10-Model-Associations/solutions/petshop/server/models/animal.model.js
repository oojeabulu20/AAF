module.exports = mongoose => {
    var Animal = mongoose.model(
      "animal",
      mongoose.Schema(
        {
          name: String,
          species: String,
          breed: String,
          age: Number,
          colour: String
        }
      )
    );
      return Animal;
   };
   