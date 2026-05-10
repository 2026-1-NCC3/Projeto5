import { supabase } from '../config/supabaseClient';

export async function createAppointment(
  body: any
) {

  const { data, error } =
    await supabase
      .from('appointments')
      .insert(body)
      .select()
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
        patients (
          id,
          name
        )
      `);

  if (error) throw error;

  return data;
}