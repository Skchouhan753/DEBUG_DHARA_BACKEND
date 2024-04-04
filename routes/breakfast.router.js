const { Router } = require("express");
const { BreakfastModel } = require("../models/breakfast.model");

const breakfastRouter = Router();

breakfastRouter.post("/create", async (req, res) => {
    try {
        const data = req.body;
        const newBreakfast = new BreakfastModel(data);
        await newBreakfast.save();
        res.status(200).json({ message: "Breakfast added to DB" });
    } catch (error) {
        res.status(400).json({ message:  error })
    }
});

breakfastRouter.get("/", async (req, res) => {
    try {
        const breakfasts = await BreakfastModel.find();
        res.status(200).json(breakfasts);
    } catch (error) {
        res.status(400).json({ message:  error });
    }
});

breakfastRouter.patch("/:breakfastId", async (req, res) => {
    const { breakfastId } = req.params;
    const body = req.body;
    try {
        await BreakfastModel.updateOne({ _id: breakfastId }, { $set: body });
        res.status(200).json({ message: "updation done" });

    } catch (error) {
        res.status(400).json({ message: error });
    }
});

breakfastRouter.delete("/:breakfastId", async (req, res) => {
    const { breakfastId } = req.params;
    try {
        await BreakfastModel.deleteOne({ _id: breakfastId });
        res.status(200).json({ message: "deletion done" });

    } catch (error) {
        res.status(400).json({ message: error });
    }
});

module.exports = { breakfastRouter };