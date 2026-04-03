"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPatients = getPatients;
exports.getPatientById = getPatientById;
exports.createPatient = createPatient;
exports.updatePatient = updatePatient;
exports.deletePatient = deletePatient;
const database_1 = require("../config/database");
async function getPatients() {
    const { data, error } = await database_1.supabase
        .from("patients")
        .select("*")
        .order("id");
    if (error)
        throw new Error(error.message);
    return data;
}
async function getPatientById(id) {
    const { data, error } = await database_1.supabase
        .from("patients")
        .select("*")
        .eq("id", id)
        .single();
    if (error)
        throw new Error(error.message);
    return data;
}
async function createPatient(name, email, phone) {
    const { data, error } = await database_1.supabase
        .from("patients")
        .insert([{ name, email, phone }])
        .select()
        .single();
    if (error)
        throw new Error(error.message);
    return data;
}
async function updatePatient(id, name, email, phone) {
    const { data, error } = await database_1.supabase
        .from("patients")
        .update({ name, email, phone })
        .eq("id", id)
        .select()
        .single();
    if (error)
        throw new Error(error.message);
    return data;
}
async function deletePatient(id) {
    const { error } = await database_1.supabase
        .from("patients")
        .delete()
        .eq("id", id);
    if (error)
        throw new Error(error.message);
}
