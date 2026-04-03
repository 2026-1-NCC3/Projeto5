"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExercise = exports.getExercises = void 0;
const database_1 = require("../config/database");
const getExercises = async () => {
    const { data, error } = await database_1.supabase
        .from("exercises")
        .select("*")
        .order("id", { ascending: false });
    if (error)
        throw new Error(error.message);
    return data;
};
exports.getExercises = getExercises;
const createExercise = async (title, description, video_url, image_url, frequency) => {
    const { data, error } = await database_1.supabase
        .from("exercises")
        .insert([{ title, description, video_url, image_url, frequency }])
        .select()
        .single();
    if (error)
        throw new Error(error.message);
    return data;
};
exports.createExercise = createExercise;
