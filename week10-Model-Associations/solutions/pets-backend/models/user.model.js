module.exports = mongoose => {
    var User = mongoose.model(
        "user",
        mongoose.Schema({
            username: {
                type: String,
                required: true,
                lowercase: true,
                unique: true
            },
            animals: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "animal"
            }],
            dateCreated:{
                type: Date,
                required: true,
                default: Date.now  }
        
        })

    );
    return User;
};
