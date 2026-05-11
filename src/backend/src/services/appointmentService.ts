import { supabase } from '../config/supabaseClient';

export async function createAppointment(body: any) {
  const { data, error } = await supabase
    .from('appointments')
    .insert(body)
    .select('*, patients (id, name)')
    .single();

  if (error) throw error;
  return data;
}

// CORRIGIDO: recebe o patientId do paciente logado e separa em proximas/historico
export async function getAppointmentsByPatient(patientId: string) {
  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('appointments')
    .select('*, patients (id, name)')
    .eq('patient_id', patientId)
    .order('appointment_date', { ascending: true });

  if (error) throw error;

  const proximas = (data ?? []).filter(
    (a: any) => a.appointment_date >= now && a.status !== 'cancelada'
  );

  const historico = (data ?? []).filter(
    (a: any) => a.appointment_date < now || a.status === 'cancelada'
  );

  return { proximas, historico };
}

export async function updateAppointment(id: string, body: any) {
  const { data, error } = await supabase
    .from('appointments')
    .update(body)
    .eq('id', id)
    .select('*, patients(id, name)')
    .single();

  if (error) throw error;
  return data;
}