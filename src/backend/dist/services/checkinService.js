"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistoricoCheckins = exports.registrarCheckin = exports.getPatientIdByUserId = void 0;
const database_1 = require("../config/database");
const getPatientIdByUserId = async (userId) => {
    const { data: user, error: userError } = await database_1.supabase
        .from("users")
        .select("email")
        .eq("id", userId)
        .single();
    if (userError || !user)
        throw new Error("Usuário não encontrado");
    const { data: patient, error: patientError } = await database_1.supabase
        .from("patients")
        .select("id")
        .eq("email", user.email)
        .single();
    if (patientError || !patient)
        throw new Error("Paciente não encontrado para este usuário");
    return patient.id;
};
exports.getPatientIdByUserId = getPatientIdByUserId;
const registrarCheckin = async (patientId) => {
    const today = new Date().toISOString().split("T")[0];
    const { data: existing } = await database_1.supabase
        .from("checkins")
        .select("id")
        .eq("patient_id", patientId)
        .eq("data", today)
        .single();
    if (existing) {
        return { jaFez: true, mensagem: "Check-in já realizado hoje", checkin: null };
    }
    const { data, error } = await database_1.supabase
        .from("checkins")
        .insert([{ patient_id: patientId, data: today }])
        .select()
        .single();
    if (error)
        throw new Error(error.message);
    return { jaFez: false, mensagem: "Check-in realizado com sucesso!", checkin: data };
};
exports.registrarCheckin = registrarCheckin;
const getHistoricoCheckins = async (patientId, dias = 7) => {
    const desde = new Date();
    desde.setDate(desde.getDate() - dias);
    const desdeStr = desde.toISOString().split("T")[0];
    const { data, error } = await database_1.supabase
        .from("checkins")
        .select("data")
        .eq("patient_id", patientId)
        .gte("data", desdeStr)
        .order("data", { ascending: true });
    if (error)
        throw new Error(error.message);
    const datas = (data ?? []).map((row) => new Date(row.data).toISOString().split("T")[0]);
    return { historico: datas, total: datas.length };
};
exports.getHistoricoCheckins = getHistoricoCheckins;
