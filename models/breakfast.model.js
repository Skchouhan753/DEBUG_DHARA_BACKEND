const { model, Schema } = require("mongoose");

const BreakfastSchema = new Schema({
    userId: String,
    name: String,
    quantity: Number,
    calories: Number,
    carbs: Number,
    fat: Number,
    protein: Number,
    sodium: Number,
    sugar: Number,
}, {
    versionKey: false
});

const BreakfastModel = model("breakfast", BreakfastSchema);

module.exports = { BreakfastModel }