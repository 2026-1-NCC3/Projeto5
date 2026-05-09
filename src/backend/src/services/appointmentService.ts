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

export async function getAppointmentsByPatient(patientId: string) {
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .eq("patient_id", patientId)
    .order("appointment_date", { ascending: true });

  if (error) throw error;

  const proximas = (data || []).filter(
    (a) => a.status === "scheduled" && a.appointment_date >= now
  );

  const historico = (data || []).filter(
    (a) => a.status === "completed" || a.appointment_date < now
  );

  return { proximas, historico };
}