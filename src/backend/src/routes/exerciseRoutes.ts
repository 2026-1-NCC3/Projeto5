import { Router } from "express";
import { supabaseAdmin } from "../config/supabaseClient";
import {
  createExerciseController,
  getExercisesController
} from "../controllers/exerciseController";
import { authMiddleware } from "../midllewares/authMiddleware";

const router = Router();

// 👩‍⚕️ criar exercício (admin depois a gente trava)
router.post("/", authMiddleware, createExerciseController);

// 📋 listar exercícios
router.get("/", authMiddleware, getExercisesController);

router.put("/:id", authMiddleware, async (req, res) => {
  const { error } = await supabaseAdmin
    .from("exercises")
    .update(req.body)
    .eq("id", req.params.id);

  if (error) return res.status(500).json({ error: error.message });
  return res.json({ message: "Exercício atualizado" });
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const { error } = await supabaseAdmin
    .from("exercises")
    .delete()
    .eq("id", req.params.id);

  if (error) return res.status(500).json({ error: error.message });
  return res.json({ message: "Exercício excluído" });
});

export default router;