import { Request, Response } from "express";
import { createExerciseLog, getLogsByPatient } from "../services/exerciseLogService";
import { getPatientProgress } from "../services/exerciseLogService";

export const addExerciseLog = async (req: Request, res: Response) => {

  try {

    const { patient_id, exercise_id, pain_level, notes } = req.body;

    const log = await createExerciseLog(
      patient_id,
      exercise_id,
      pain_level,
      notes
    );

    res.status(201).json(log);

  } catch (error: any) {

    res.status(500).json({
      message: error.message
    });

  }

};

export const getPatientLogs = async (req: Request, res: Response) => {

  try {

    const { patientId } = req.params;

    const logs = await getLogsByPatient(Number(patientId));

    res.json(logs);

  } catch (error: any) {

    res.status(500).json({
      message: error.message
    });

  }

};

export const getProgress = async (req: Request, res: Response) => {

  try {

    const { patientId } = req.params;

    const progress = await getPatientProgress(Number(patientId));

    res.json(progress);

  } catch (error: any) {

    res.status(500).json({
      message: error.message
    });

  }

};