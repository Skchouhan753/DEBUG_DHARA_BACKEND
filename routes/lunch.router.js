const { Router } = require("express");
const { LunchModel } = require("../models/lunch.model");

const lunchRouter = Router();


lunchRouter.post("/create", async (req, res) => {
    const data = req.body;
    try {
        const newLunch = new LunchModel(data);
        await newLunch.save();
        res.status(200).json(newLunch);
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

lunchRouter.get("/", async (req, res) => {
    try {
        const lunchs = await LunchModel.find();
        res.status(200).json(lunchs);

    } catch (error) {
        res.status(400).json({ message: error });
    }
});

lunchRouter.patch("/:lunchId", async (req, res) => {
    const { lunchId } = req.params;
    const body = req.body;
    try {
        await LunchModel.updateOne({ _id: lunchId }, { $set: body });
        res.status(200).json({ message: "updation done" });
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

lunchRouter.delete("/:lunchId", async (req, res) => {
    const { lunchId } = req.params;
    try {
        await LunchModel.deleteOne({ _id: lunchId });
        res.status(200).json({ message: "deletion done" });
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

module.exports = { lunchRouter };