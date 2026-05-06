import { supabaseAdmin } from "../config/supabaseClient";

interface CreateExerciseDTO {
  title: string;
  description: string;
  image_url?: string;
}

export async function createExercise(data: CreateExerciseDTO) {
  const { title, description, image_url } = data;

  const { error } = await supabaseAdmin
    .from("exercises")
    .insert({
      title,
      description,
      image_url
    });

  if (error) throw error;

  return { message: "Exercício criado com sucesso" };
}


export async function getExercises() {
  const { data, error } = await supabaseAdmin
    .from("exercises")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}