"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPatientFullPlan = exports.addExercise = exports.listPatientPlans = exports.createExercisePlan = void 0;
const planService_1 = require("../services/planService");
const createExercisePlan = async (req, res) => {
    const { patient_id, notes } = req.body;
    const plan = await (0, planService_1.createPlan)(patient_id, notes);
    res.json(plan);
};
exports.createExercisePlan = createExercisePlan;
const listPatientPlans = async (req, res) => {
    const patientId = Number(req.params.patientId);
    const plans = await (0, planService_1.getPlansByPatient)(patientId);
    res.json(plans);
};
exports.listPatientPlans = listPatientPlans;
const addExercise = async (req, res) => {
    const planId = Number(req.params.planId);
    const { exercise_id, frequency, instructions } = req.body;
    const item = await (0, planService_1.addExerciseToPlan)(planId, exercise_id, frequency, instructions);
    res.json(item);
};
exports.addExercise = addExercise;
const getPatientFullPlan = async (req, res) => {
    try {
        const { patientId } = req.params;
        const plan = await (0, planService_1.getFullPlanByPatient)(Number(patientId));
        res.json(plan);
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
exports.getPatientFullPlan = getPatientFullPlan;
