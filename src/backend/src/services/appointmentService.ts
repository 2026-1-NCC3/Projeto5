import { supabase } from '../config/supabaseClient';

export async function createAppointment(
  body: any
) {

  const { data, error } =
    await supabase
      .from('appointments')
      .insert(body)
      .select('*, patients (id, name)')
      .single();

  if (error) throw error;

  return data;
}

export async function getAppointments() {

  const { data, error } =
    await supabase
      .from('appointments')
      .select(`
        *,
        patients (id,name) `)
      .order('appointment_date', { ascending: true });

  if (error) throw error;

  return data;
}