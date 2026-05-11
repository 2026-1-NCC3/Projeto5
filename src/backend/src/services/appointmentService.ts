import { supabase } from '../config/supabaseClient';
import { getPatientId } from '../utils/getPatientId';

export async function createAppointment(body: any) {
  const { data, error } = await supabase
    .from('appointments')
    .insert(body)
    .select('*, patients (id, name)')
    .single();

  if (error) throw error;
  return data;
}

export async function getMyAppointments(authUserId: string) {
  const patientId = await getPatientId(authUserId);

  if (!patientId) {
    throw { status: 404, message: 'Paciente não encontrado para este usuário' };
  }

  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('appointments')
    .select('*, patients (id, name)')
    .eq('patient_id', patientId)
    .order('appointment_date', { ascending: true });

  if (error) throw error;

  const proximas  = (data ?? []).filter((a: any) => a.appointment_date >= now);
  const historico = (data ?? []).filter((a: any) => a.appointment_date < now);

  return { proximas, historico };
}

export async function getAppointments() {
  const { data, error } = await supabase
    .from('appointments')
    .select('*, patients (id, name)')
    .order('appointment_date', { ascending: true });

  if (error) throw error;
  return data;
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