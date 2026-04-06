import { useState } from "react";
import { supabase } from "../../services/supabase";
import "./ResetSenha.css";
import mayaImg from "../../assets/Maya.png";

function EsqueceuSenha() {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setMensagem("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:5173/reset-senha",
      });

      if (error) throw error;

      setMensagem("Email de recuperação enviado!");
    } catch (error) {
      setErro("Erro ao enviar email.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <img src={mayaImg} alt="Maya" />
        <div className="overlay">
          <h1>Clínica Maya Yamamoto</h1>
          <p>Especialista em RPG</p>
        </div>
      </div>

      <div className="login-right">
        <div className="login-box">
          <h2>Recuperar senha</h2>
          <p className="subtitle">
           Não se preocupe, enviaremos um link para você redefinir sua senha 💙
         </p>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {erro && <p style={{ color: "#e05b5b" }}>{erro}</p>}
            {mensagem && <p style={{ color: "green" }}>{mensagem}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar email"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EsqueceuSenha;