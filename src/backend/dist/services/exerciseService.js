"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExercise = exports.getExercises = void 0;
const database_1 = require("../config/database");
const getExercises = async () => {
    const result = await database_1.pool.query("SELECT * FROM exercises ORDER BY id DESC");
    return result.rows;
};
exports.getExercises = getExercises;
const createExercise = async (title, description, video_url, image_url, frequency) => {
    const result = await database_1.pool.query(`INSERT INTO exercises (title, description, video_url, image_url, frequency)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`, [title, description, video_url, image_url, frequency]);
    return result.rows[0];
};
exports.createExercise = createExercise;
