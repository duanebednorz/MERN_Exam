const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const ItemSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true,"What's the name of this pet?"],
        minlength: [2,"Gotta have at least 2 letters."],
        unique: [true, "Name must be unique"]
    },
    PetType: {
        type: String,
        required: [true,"What kind of pet is this?"],
        min: [3,"Must have at least 3 letters."]
    },
    Description:{
        type: String,
        required: [true,"Describe this pet."],
        minlength:[5,"Gotta be at least 5 characters."]
    },
    Skill1: {
        type: String,
    },
    Skill2: {
        type: String,
    },
    Skill3: {
        type: String,
    },

}, {timestamps:true});

ItemSchema.plugin(uniqueValidator);

const Item = mongoose.model("Items", ItemSchema);

module.exports = Item;