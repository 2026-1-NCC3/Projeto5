"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPatients = getPatients;
exports.getPatientById = getPatientById;
exports.createPatient = createPatient;
exports.updatePatient = updatePatient;
exports.deletePatient = deletePatient;
const supabaseClient_1 = require("../config/supabaseClient");
async function getPatients(userId) {
    const { data, error } = await supabaseClient_1.supabaseClient
        .from("patients")
        .select("*")
        .eq("user_id", userId)
        .order("id");
    if (error)
        throw new Error(error.message);
    return data;
}
async function getPatientById(id, userId) {
    const { data, error } = await supabaseClient_1.supabaseClient
        .from("patients")
        .select("*")
        .eq("id", id)
        .eq("user_id", userId)
        .single();
    if (error)
        throw new Error(error.message);
    return data;
}
async function createPatient(userId, data) {
    const { data: result, error } = await supabaseClient_1.supabaseClient
        .from("patients")
        .insert([{
            ...data,
            user_id: userId
        }])
        .select()
        .single();
    if (error) {
        console.error("ERRO SUPABASE:", error);
        throw new Error(error.message);
    }
    return result;
}
async function updatePatient(id, userId, data) {
    const { data: result, error } = await supabaseClient_1.supabaseClient
        .from("patients")
        .update(data)
        .eq("id", id)
        .eq("user_id", userId)
        .select()
        .single();
    if (error)
        throw new Error(error.message);
    return result;
}
async function deletePatient(id, userId) {
    const { error } = await supabaseClient_1.supabaseClient
        .from("patients")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);
    if (error)
        throw new Error(error.message);
}
