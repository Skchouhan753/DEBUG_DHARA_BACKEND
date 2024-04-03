const { Router } = require('express');

const strengthRouter = Router();

const StrengthModel = require("../models/Strength.model")

strengthRouter.post("/create", async (req, res) => {
    const data = req.body;
    try {
        const newStrength = new StrengthModel(data);
        await newStrength.save();
        res.status(200).json(newStrength);

    } catch (error) {
        res.status(400).json({ msg: "Error", error })
    }
});

strengthRouter.get("/", async (req, res) => {
    try {
        const strength = await StrengthModel.find();
        res.status(200).json(strength);

    } catch (error) {
        res.status(400).json({ msg: "Error", error })
    }
});

strengthRouter.patch("/:strengthId", async (req, res) => {
    const { strengthId } = req.params;
    const body = req.body;
    try {
        await StrengthModel.updateOne({ _id: strengthId }, { $set: body });
        res.status(200).json({ message: "updation done" });

    } catch (error) {
        res.status(400).json({ msg: "Error", error })
    }
});

strengthRouter.delete("/:strengthId", async (req, res) => {
    const { strengthId } = req.params;
    try {
        await StrengthModel.deleteOne({ _id: strengthId });
        res.status(200).json({ message: "deletion done" });

    } catch (error) {
        res.status(400).json({ msg: "Error", error })
    }
});

module.exports = { strengthRouter };
