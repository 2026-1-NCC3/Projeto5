"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ativarConta = exports.verificarPaciente = void 0;
const supabaseClient_1 = require("../config/supabaseClient");
const bcrypt_1 = __importDefault(require("bcrypt"));
const verificarPaciente = async (req, res) => {
    const { nome, cpf, birth_date, email } = req.body;
    const converterData = (data) => {
        if (!data)
            return null;
        if (data.includes("-"))
            return data;
        const [dia, mes, ano] = data.split("/");
        return `${ano}-${mes}-${dia}`;
    };
    const birthDateFormatado = converterData(birth_date);
    const { data: paciente, error } = await supabaseClient_1.supabaseClient
        .from("patients")
        .select("*")
        .eq("cpf", cpf)
        .eq("email", email)
        .single();
    if (error || !paciente) {
        return res.status(404).json({ message: "Paciente não encontrado. Contate a clínica." });
    }
    // comparar nome e data de nascimento para garantir que são os mesmos dados do paciente
    const nomeOk = paciente.name.toLowerCase().trim() === nome.toLowerCase().trim();
    const dataOk = paciente.birth_date === birth_date;
    if (!nomeOk || !dataOk) {
        return res.status(400).json({ message: "Dados não conferem. Verifique e tente novamente." });
    }
    if (paciente.status_conta === "ativo") {
        return res.status(400).json({ message: "Conta já ativada. Faça login normalmente." });
    }
    return res.json({ message: "Paciente encontrado!", paciente_id: paciente.id, email: paciente.email });
};
exports.verificarPaciente = verificarPaciente;
const ativarConta = async (req, res) => {
    const { paciente_id, email, senha } = req.body;
    if (!paciente_id || !email || !senha) {
        return res.status(400).json({ message: "Dados incompletos." });
    }
    if (senha.length < 6) {
        return res.status(400).json({ message: "Senha deve ter pelo menos 6 caracteres." });
    }
    // pra verificar se já tem usuário com esse email
    const { data: userExistente } = await supabaseClient_1.supabaseClient
        .from("users")
        .select("id")
        .eq("email", email)
        .single();
    if (userExistente) {
        return res.status(400).json({ message: "Usuário já cadastrado com este email." });
    }
    const hashedPassword = await bcrypt_1.default.hash(senha, 10);
    // criar o paciente como usuário no sistema
    const { data: novoUser, error: userError } = await supabaseClient_1.supabaseClient
        .from("users")
        .insert([{ name: email, email, password: hashedPassword, role: "patient" }])
        .select("id, email, role")
        .single();
    if (userError) {
        return res.status(500).json({ message: "Erro ao criar usuário." });
    }
    // atualizar o status da conta do paciente para "ativo"
    await supabaseClient_1.supabaseClient
        .from("patients")
        .update({ status_conta: "ativo" })
        .eq("id", paciente_id);
    return res.status(201).json({ message: "Conta ativada com sucesso!", user: novoUser });
};
exports.ativarConta = ativarConta;
