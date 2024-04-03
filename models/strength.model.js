
const { model, Schema } = require("mongoose");

const strengthSchema = new Schema({
    nameStrength: String,
    time: Number,
    calories: Number,
    distance: Number
},{
    versionKey: false
});

const strengthModel = model("strength", strengthSchema);

module.exports = { strengthModel }