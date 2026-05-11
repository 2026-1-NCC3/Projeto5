import { useState, useEffect } from "react";
import "./Configuracoes.css";
import api from "../../services/api";

export default function Configuracoes() {
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);

  const [modoNoturno, setModoNoturno] = useState(false);
  useEffect(() => {

  const temaSalvo =
    localStorage.getItem('modoNoturno');

  if (temaSalvo === 'true') {

    setModoNoturno(true);

    document.body.classList.add('dark');
  }

}, []);

useEffect(() => {

  if (modoNoturno) {

    document.body.classList.add('dark');

  } else {

    document.body.classList.remove('dark');
  }

  localStorage.setItem(
    'modoNoturno',
    modoNoturno
  );

}, [modoNoturno]);

  useEffect(() => {
    const buscarPerfil = async () => {
      try {
        const { data } = await api.get("/api/patients/me");
        setPerfil(data);
      } catch (err) {
        console.error("Erro ao buscar perfil:", err);
        setPerfil(null);
      } finally {
        setLoading(false);
      }
    };
    buscarPerfil();
  }, []);

  const form = perfil
    ? {
        nome: perfil.name || "—",
        email: perfil.email || "—",
        telefone: perfil.phone || "—",
        especialidade: perfil.diagnosis || "—",
      }
    : {
        nome: "Maya Yamamoto",
        email: "testepi@gmail.com",
        telefone: "11999998876",
        especialidade: "Fisioterapia",
      };

  return (
    <div className="config-page">
      <div className="config-header">
        <h1 className="config-title">Configurações</h1>
        <p className="config-subtitle">Gerencie as preferências da sua conta</p>
      </div>

      {loading && (
        <div className="config-card" style={{ textAlign: 'center', color: '#9aa', padding: '32px' }}>
          Carregando dados do perfil...
        </div>
      )}

      <div className="config-card">
        <div className="config-section-header">
          <div className="config-icon config-icon--perfil">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div>
            <h2 className="config-section-title">Perfil</h2>
            <p className="config-section-desc">Suas informações pessoais</p>
          </div>
        </div>

        <div className="config-form-grid">
          <div className="config-field">
            <span className="config-label">Nome completo</span>
            <span className="config-value">{form.nome}</span>
          </div>
          <div className="config-field">
            <span className="config-label">Email</span>
            <span className="config-value">{form.email}</span>
          </div>
          <div className="config-field">
            <span className="config-label">Telefone</span>
            <span className="config-value">{form.telefone}</span>
          </div>
          <div className="config-field">
            <span className="config-label">Especialidade</span>
            <span className="config-value">{form.especialidade}</span>
          </div>
        </div>
      </div>



      <div className="config-card">
        <div className="config-section-header">
          <div className="config-icon config-icon--noturno">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          </div>
          <div>
            <h2 className="config-section-title">Modo Noturno</h2>
            <p className="config-section-desc">Ajuste a aparência desta página</p>
          </div>
        </div>

        <div className="config-toggle-row">
          <div className="config-toggle-left">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="config-toggle-icon">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
            <div>
              <p className="config-toggle-label">Ativar Modo Noturno</p>
              <p className="config-toggle-desc">Mude para o tema escuro</p>
            </div>
          </div>
          <button
            className={`config-toggle ${modoNoturno ? "config-toggle--on" : ""}`}
            onClick={() => setModoNoturno(!modoNoturno)}
            aria-checked={modoNoturno}
            role="switch"
          >
            <span className="config-toggle-thumb" />
          </button>
        </div>
      </div>
    </div>
  );
}