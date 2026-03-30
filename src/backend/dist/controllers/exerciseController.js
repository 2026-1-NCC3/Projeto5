"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addExercise = exports.listExercises = void 0;
const exerciseService_1 = require("../services/exerciseService");
const listExercises = async (req, res) => {
    const exercises = await (0, exerciseService_1.getExercises)();
    res.json(exercises);
};
exports.listExercises = listExercises;
const addExercise = async (req, res) => {
    const { title, description, video_url, image_url, frequency } = req.body;
    const exercise = await (0, exerciseService_1.createExercise)(title, description, video_url, image_url, frequency);
    res.json(exercise);
};
exports.addExercise = addExercise;
