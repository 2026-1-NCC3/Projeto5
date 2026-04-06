import { useState } from "react";
import { supabase } from "../../services/supabase";
import { useNavigate } from "react-router-dom";
import "./ResetSenha.css";
import mayaImg from "../../assets/Maya.png";

function ResetSenha() {
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: senha,
    });

    if (!error) {
      alert("Senha atualizada!");
      navigate("/login");
    }

    setLoading(false);
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
          <h2>Nova senha</h2>

          <form onSubmit={handleReset}>
            <input
              type="password"
              placeholder="Nova senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar nova senha"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetSenha;