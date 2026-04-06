import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import mayaImg from "../../assets/Maya.png";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { useAuth } from "../../hooks/useAuth";
import { supabase } from "../../services/supabase";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");
    setLoading(true);

    try {

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: senha,
      });

      if (error) throw error;


      login(data.user, data.session.access_token);


      navigate("/");
    } catch (error) {
      setErro("Email ou senha inválidos.");
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
          <h2>Bem-vinda, Maya!</h2>
          <span>Acesse sua conta para gerenciar seus pacientes e consultas.</span>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>E-mail</label>
              <input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group password">
              <label>Senha</label>
              <div className="password-wrapper">
                <input
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
                <IconButton
                  className="eye"
                  size="small"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                >
                  {mostrarSenha ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </div>
            </div>

            <div className="options">
              <div className="remember-group">
                <div
                  className={`toggle ${lembrar ? "active" : ""}`}
                  onClick={() => setLembrar(!lembrar)}
                >
                  <div className="circle"></div>
                </div>
                <span className="remember-text">Lembrar de mim</span>
              </div>
              <a href="/esqueceu-senha">Esqueceu sua senha?</a>
            </div>

            {erro && (
              <p style={{ color: "#e05b5b", fontSize: "13px", marginTop: "-8px" }}>
                {erro}
              </p>
            )}

            <button type="submit" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;