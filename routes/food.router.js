const { Router } = require("express");
const { FoodModel } = require("../models/food.model");

const foodsRouter = Router();

foodsRouter.post("/create", async (req, res) => {
    try {
        const data = req.body;
        await FoodModel.insertMany(data)
        res.status(200).send({ msg: "Foods saved to DB" });
    } catch (error) {
        res.status(400).send({ msg: error })
    }
});


foodsRouter.get("/", async (req, res) => {
    const { q } = req.query;
    try {
        const foods = await FoodModel.find({ "name": { $regex: q, $options: "i" } })
        res.status(200).send(foods)

    } catch (error) {
        res.status(400).json({ msg: error })
    }
})


module.exports = { foodsRouter };