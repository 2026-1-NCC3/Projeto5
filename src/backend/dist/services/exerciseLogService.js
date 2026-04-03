"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPatientProgress = exports.getLogsByPatient = exports.createExerciseLog = void 0;
const database_1 = require("../config/database");
const createExerciseLog = async (patient_id, exercise_id, pain_level, notes) => {
    const { data, error } = await database_1.supabase
        .from("exercise_logs")
        .insert([{ patient_id, exercise_id, pain_level, notes }])
        .select()
        .single();
    if (error)
        throw new Error(error.message);
    return data;
};
exports.createExerciseLog = createExerciseLog;
const getLogsByPatient = async (patientId) => {
    const { data, error } = await database_1.supabase
        .from("exercise_logs")
        .select("*")
        .eq("patient_id", patientId)
        .order("created_at", { ascending: false });
    if (error)
        throw new Error(error.message);
    return data;
};
exports.getLogsByPatient = getLogsByPatient;
const getPatientProgress = async (patientId) => {
    const { data, error } = await database_1.supabase
        .from("exercise_logs")
        .select("exercise_id, pain_level, created_at, exercises(title)")
        .eq("patient_id", patientId)
        .order("created_at", { ascending: true });
    if (error)
        throw new Error(error.message);
    return data;
};
exports.getPatientProgress = getPatientProgress;
