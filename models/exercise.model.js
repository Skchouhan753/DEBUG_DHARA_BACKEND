const { model, Schema } = require("mongoose");

const exerciseSchema = new Schema({
    name: String,
    time: Number,
    calories: Number,
    distance: Number
}, {
    versionKey: false
});

const exerciseModel = model("strength", exerciseSchema);

module.exports = {
    exerciseModel
}