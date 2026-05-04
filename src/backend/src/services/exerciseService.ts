import { supabaseClient } from "../config/supabaseClient";

export const getExercises = async () => {
  const { data, error } = await supabaseClient
    .from("exercises")
    .select("*")
    .order("id", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
};

export const createExercise = async (
  title: string,
  description: string,
  video_url: string,
  image_url: string,
  frequency: string
) => {
  const { data, error } = await supabaseClient
    .from("exercises")
    .insert([{ title, description, video_url, image_url, frequency }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
};