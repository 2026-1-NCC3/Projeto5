import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import mayaImg from "../../assets/Maya.png";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // login fake para qualquer email e senha
    localStorage.setItem("user", JSON.stringify({ email }));
    navigate("/dashboard");
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
          <span>
            Acesse sua conta para gerenciar seus pacientes e consultas.
          </span>

          <form onSubmit={handleLogin}>

  
            <div className="input-group">
              <label>E-mail</label>
              <input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

  <a href="#">Esqueceu sua senha?</a>
</div>

            <button type="submit">Entrar</button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default Login;