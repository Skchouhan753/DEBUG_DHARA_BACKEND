const { Router } = require("express");
const { SnackModel } = require("../models/snack.model");

const snackRouter = Router();


snackRouter.post("/create", async (req, res) => {
    const data = req.body;
    const newSnack = new SnackModel(data);
    try {
        await newSnack.save();
        res.status(200).json(newSnack);
    } catch (error) {
        res.status(400).json({ message: error })
    }
});

snackRouter.get("/", async (req, res) => {
    try {
        const snacks = await SnackModel.find();
        res.status(200).json(snacks);
    } catch (error) {
        res.status(400).json({ message: error })
    }
});

snackRouter.patch("/:snackId", async (req, res) => {
    const { snackId } = req.params;
    const body = req.body;
    try {
        await SnackModel.updateOne({ _id: snackId }, { $set: body });
        res.status(200).json({ message: "updation done" });
    } catch (error) {
        res.status(400).json({ message: error })
    }
});

snackRouter.delete("/:snackId", async (req, res) => {
    try {
        const { snackId } = req.params;
        await SnackModel.deleteOne({ _id: snackId });
        res.status(200).json({ message: "deletion done" });

    } catch (error) {
        res.status(400).json({ message: error })
    }
});

module.exports = { snackRouter };