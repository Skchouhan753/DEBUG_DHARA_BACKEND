
const { Router } = require("express");
const { DinnerModel } = require("../models/dinner.model");

const dinnerRouter = Router();

dinnerRouter.post("/create", async (req, res) => {
    const data = req.body;
    try {
        const newDinner = new DinnerModel(data);
        await newDinner.save();
        res.status(200).json(newDinner);

    } catch (error) {
        res.status(400).json({ message: "Error,", error });
    }
});

dinnerRouter.get("/", async (req, res) => {
    try {
        const dinners = await DinnerModel.find();
        res.status(200).json(dinners);
    } catch (error) {
        res.status(400).json({ message: "Error,", error });
    }
});

dinnerRouter.patch("/:dinnerId", async (req, res) => {
    const { dinnerId } = req.params;
    const body = req.body;
    try {
        await DinnerModel.updateOne({ _id: dinnerId }, { $set: body });
        res.status(200).json({ message: "updation done" });

    } catch (error) {
        res.status(400).json({ message: "Error,", error });
    }
});

dinnerRouter.delete("/:dinnerId", async (req, res) => {
    const { dinnerId } = req.params;
    try {
        await DinnerModel.deleteOne({ _id: dinnerId });
        res.status(200).json({ message: "deletion done" });
    } catch (error) {
        res.status(400).json({ message: "Error,", error });
    }
});

module.exports = { dinnerRouter };
