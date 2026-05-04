"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullPlanByPatient = exports.addExerciseToPlan = exports.getPlansByPatient = exports.createPlan = void 0;
const supabaseClient_1 = require("../config/supabaseClient");
const createPlan = async (patient_id, notes) => {
    const { data, error } = await supabaseClient_1.supabaseClient
        .from("exercise_plans")
        .insert([{ patient_id, notes }])
        .select()
        .single();
    if (error)
        throw new Error(error.message);
    return data;
};
exports.createPlan = createPlan;
const getPlansByPatient = async (patientId) => {
    const { data, error } = await supabaseClient_1.supabaseClient
        .from("exercise_plans")
        .select("*")
        .eq("patient_id", patientId)
        .order("created_at", { ascending: false });
    if (error)
        throw new Error(error.message);
    return data;
};
exports.getPlansByPatient = getPlansByPatient;
const addExerciseToPlan = async (plan_id, exercise_id, frequency, instructions) => {
    const { data, error } = await supabaseClient_1.supabaseClient
        .from("exercise_plan_items")
        .insert([{ plan_id, exercise_id, frequency, instructions }])
        .select()
        .single();
    if (error)
        throw new Error(error.message);
    return data;
};
exports.addExerciseToPlan = addExerciseToPlan;
const getFullPlanByPatient = async (patientId) => {
    const { data: plans, error: planError } = await supabaseClient_1.supabaseClient
        .from("exercise_plans")
        .select(`
      id, notes, created_at, patient_id,
      patients (id, name),
      exercise_plan_items (
        id, frequency, instructions,
        exercises (id, title, description)
      )
    `)
        .eq("patient_id", patientId);
    if (planError)
        throw new Error(planError.message);
    const { data: logs } = await supabaseClient_1.supabaseClient
        .from("exercise_logs")
        .select("exercise_id, pain_level, created_at")
        .eq("patient_id", patientId)
        .order("created_at", { ascending: false });
    const logsMap = new Map();
    (logs ?? []).forEach((log) => {
        if (!logsMap.has(log.exercise_id)) {
            logsMap.set(log.exercise_id, { pain_level: log.pain_level, created_at: log.created_at });
        }
    });
    const rows = [];
    (plans ?? []).forEach((plan) => {
        (plan.exercise_plan_items ?? []).forEach((item) => {
            const ex = item.exercises;
            const log = logsMap.get(ex?.id);
            rows.push({
                patient_id: plan.patients?.id,
                patient_name: plan.patients?.name,
                plan_id: plan.id,
                exercise_id: ex?.id,
                exercise_title: ex?.title,
                description: ex?.description,
                frequency: item.frequency,
                instructions: item.instructions,
                pain_level: log?.pain_level ?? null,
                created_at: log?.created_at ?? null,
            });
        });
    });
    return rows;
};
exports.getFullPlanByPatient = getFullPlanByPatient;
