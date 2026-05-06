import { supabase } from "../config/supabaseClient";

export async function getPatientId(authUserId: string) {
  const { data, error } = await supabase
    .from("patient_accounts")
    .select("patient_id")
    .eq("auth_user_id", authUserId)
    .maybeSingle();

  if (error) throw error;

  return data?.patient_id || null;
}