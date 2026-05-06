import { supabase } from "../config/supabaseClient";

export async function createAppointment(data: any) {
  const { patient_id, appointment_date, notes } = data;

  const { error } = await supabase
    .from("appointments")
    .insert({
      patient_id,
      appointment_date,
      status: "scheduled",
      notes: notes || null,
      created_at: new Date()
    });

  if (error) throw error;

  return { message: "Consulta agendada com sucesso" };
}

export async function getAppointments() {
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .order("appointment_date", { ascending: true });

  if (error) throw error;

  return data;
}