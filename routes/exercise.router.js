const { Router } = require('express');
const exerciseRouter = Router();
const { exerciseModel } = require('../models/exercise.model');

exerciseRouter.post("/create", async (req, res) => {
    try {
        const data = req.body;
        const newExercise = new exerciseModel(data);
        await newExercise.save();
        res.status(200).send(newExercise);
    } catch (error) {
        res.status(400).json({ msg: "Error", error });
    }

});

exerciseRouter.get("/", async (req, res) => {
    try {
        const exercise = await exerciseModel.find();
        res.status(200).send(exercise);
    } catch (error) {
        res.status(400).json({ msg: "Error", error });
    }

});

exerciseRouter.patch("/:exerciseId", async (req, res) => {
    try {
        const { exerciseId } = req.params;
        const body = req.body;
        await exerciseModel.updateOne({ _id: exerciseId }, { $set: body });
        res.status(200).send({ msg: "updation done" });
    } catch (error) {
        res.status(400).json({ msg: "Error", error });
    }
});

exerciseRouter.delete("/:exerciseId", async (req, res) => {
    try {
        const { exerciseId } = req.params;
        await exerciseModel.deleteOne({ _id: exerciseId });
        res.status(200).send({ message: "deletion done" });
    } catch (error) {
        res.status(400).json({ msg: "Error", error });
    }
});

module.exports = exerciseRouter;
