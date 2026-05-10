import { supabaseAdmin } from "../config/supabaseClient";

export async function getExercisePlanByPatient(patientId: string) {
  const { data, error } = await supabaseAdmin
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

  const plan = data.plans as any;
  return {
    id: data.id,
    planId: plan?.id,
    title: plan?.title,
    description: plan?.description,
    exercises: (plan?.plan_exercises ?? []).map((pe: any) => {
      const [series = '', reps = '', rest = ''] = (pe.frequency ?? '').split(' | ');
      return {
        id: pe.id,
        exerciseId: pe.exercises?.id ?? '',
        title: pe.exercises?.title ?? '',
        description: pe.exercises?.description ?? '',
        image_url: pe.exercises?.image_url ?? null,
        frequency: pe.frequency ?? '',
        series,
        reps,
        rest,
        notes: '',
      };
    }),
  };
}

export async function createExercisePlan(
  patientId: string,
  body: { exercises: any[] }
) {
  const { data: plan, error: planError } = await supabaseAdmin
    .from("plans")
    .insert({ title: "Plano de Exercícios", description: "" })
    .select()
    .single();

  if (planError) throw planError;

  const planExercises = body.exercises
    .filter((ex: any) => ex.exerciseId)
    .map((ex: any) => ({
      plan_id: plan.id,
      exercise_id: ex.exerciseId,
      frequency: [ex.series, ex.reps, ex.rest].filter(Boolean).join(" | "),
    }));

  if (planExercises.length > 0) {
    const { error: peError } = await supabaseAdmin
      .from("plan_exercises")
      .insert(planExercises);
    if (peError) throw peError;
  }

  const { error: ppError } = await supabaseAdmin
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
  const { data: pp, error: ppError } = await supabaseAdmin
    .from("patient_plans")
    .select("plan_id")
    .eq("id", patientPlanId)
    .single();

  if (ppError) throw ppError;
  const planId = pp.plan_id;

  const { error: delError } = await supabaseAdmin
    .from("plan_exercises")
    .delete()
    .eq("plan_id", planId);

  if (delError) throw delError;

  const planExercises = body.exercises
    .filter((ex: any) => ex.exerciseId)
    .map((ex: any) => ({
      plan_id: planId,
      exercise_id: ex.exerciseId,
      frequency: [ex.series, ex.reps, ex.rest].filter(Boolean).join(" | "),
    }));

  if (planExercises.length > 0) {
    const { error: peError } = await supabaseAdmin
      .from("plan_exercises")
      .insert(planExercises);
    if (peError) throw peError;
  }

  return getExercisePlanByPatient(patientId);
}

export async function deleteExercisePlan(patientPlanId: string) {
  const { data: pp, error: ppError } = await supabaseAdmin
    .from("patient_plans")
    .select("plan_id")
    .eq("id", patientPlanId)
    .single();

  if (ppError) throw ppError;

  const { error: delPP } = await supabaseAdmin
    .from("patient_plans")
    .delete()
    .eq("id", patientPlanId);

  if (delPP) throw delPP;

  const { error: delPlan } = await supabaseAdmin
    .from("plans")
    .delete()
    .eq("id", pp.plan_id);

  if (delPlan) throw delPlan;

  return { message: "Plano excluído com sucesso" };
}