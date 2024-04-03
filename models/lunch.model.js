const { model, Schema } = require("mongoose");

const LunchSchema = new Schema({
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

const LunchModel = model("lunch", LunchSchema);

module.exports = { LunchModel };