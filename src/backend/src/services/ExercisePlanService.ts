import { supabase } from "../config/supabaseClient";

export async function getExercisePlanByPatient(patientId: string) {
  // Busca o patient_plan mais recente com todos os exercícios
  const { data, error } = await supabase
    .from("patient_plans")
    .select(`
      id,
      patient_id,
      plans (
        id,
        title,
        description,
        plan_exercises (
          id,
          frequency,
          exercises (
            id,
            title,
            description,
            image_url
          )
        )
      )
    `)
    .eq("patient_id", patientId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  // Normaliza para o formato que o frontend espera
  const plan = data.plans as any;
  return {
    id: data.id,
    planId: plan?.id,
    title: plan?.title,
    description: plan?.description,
    exercises: (plan?.plan_exercises ?? []).map((pe: any) => ({
      id: pe.id,
      exerciseId: pe.exercises?.id ?? "",
      title: pe.exercises?.title ?? "",
      description: pe.exercises?.description ?? "",
      image_url: pe.exercises?.image_url ?? null,
      frequency: pe.frequency ?? "",
      series: "",
      reps: "",
      rest: "",
      notes: "",
    })),
  };
}

export async function createExercisePlan(
  patientId: string,
  body: { exercises: any[] }
) {
  // 1. Cria o plan
  const { data: plan, error: planError } = await supabase
    .from("plans")
    .insert({ title: "Plano de Exercícios", description: "" })
    .select()
    .single();

  if (planError) throw planError;

  // 2. Cria as linhas plan_exercises
  const planExercises = body.exercises
    .filter((ex: any) => ex.exerciseId)
    .map((ex: any) => ({
      plan_id: plan.id,
      exercise_id: ex.exerciseId,
      frequency: [ex.series, ex.reps, ex.rest].filter(Boolean).join(" | "),
    }));

  if (planExercises.length > 0) {
    const { error: peError } = await supabase
      .from("plan_exercises")
      .insert(planExercises);
    if (peError) throw peError;
  }

  // 3. Associa ao paciente
  const { data: pp, error: ppError } = await supabase
    .from("patient_plans")
    .insert({ patient_id: patientId, plan_id: plan.id })
    .select()
    .single();

  if (ppError) throw ppError;

  return getExercisePlanByPatient(patientId);
}

export async function updateExercisePlan(
  patientPlanId: string,
  patientId: string,
  body: { exercises: any[] }
) {
  // Busca o plan_id vinculado ao patient_plan
  const { data: pp, error: ppError } = await supabase
    .from("patient_plans")
    .select("plan_id")
    .eq("id", patientPlanId)
    .single();

  if (ppError) throw ppError;
  const planId = pp.plan_id;

  // Remove plan_exercises antigas
  const { error: delError } = await supabase
    .from("plan_exercises")
    .delete()
    .eq("plan_id", planId);

  if (delError) throw delError;

  // Recria as linhas
  const planExercises = body.exercises
    .filter((ex: any) => ex.exerciseId)
    .map((ex: any) => ({
      plan_id: planId,
      exercise_id: ex.exerciseId,
      frequency: [ex.series, ex.reps, ex.rest].filter(Boolean).join(" | "),
    }));

  if (planExercises.length > 0) {
    const { error: peError } = await supabase
      .from("plan_exercises")
      .insert(planExercises);
    if (peError) throw peError;
  }

  return getExercisePlanByPatient(patientId);
}

export async function deleteExercisePlan(patientPlanId: string) {
  // Busca o plan_id para deletar em cascata
  const { data: pp, error: ppError } = await supabase
    .from("patient_plans")
    .select("plan_id")
    .eq("id", patientPlanId)
    .single();

  if (ppError) throw ppError;

  // Deleta patient_plan (cascade cuida do resto via FK se configurado)
  const { error: delPP } = await supabase
    .from("patient_plans")
    .delete()
    .eq("id", patientPlanId);

  if (delPP) throw delPP;

  // Deleta o plan também
  const { error: delPlan } = await supabase
    .from("plans")
    .delete()
    .eq("id", pp.plan_id);

  if (delPlan) throw delPlan;

  return { message: "Plano excluído com sucesso" };
}