const mongoose = require("mongoose");

const cardioSchema = new mongoose.Schema({

    nameExercise: String,
    time: Number,
    calories: Number,
    distance: Number
}, {
    versionKey: false
});



const cardioModel = mongoose.model("cardio", cardioSchema);


module.exports = {
    cardioModel
}
