import { useState } from "react";
import "./Configuracoes.css";

export default function Configuracoes() {
  const form = {
    nome: "Mary Yamamoto",
    email: "mary.yamamoto@example.com",
    telefone: "(11) 98765-4321",
    especialidade: "Clínico Geral",
  };

  const [notificacoesEmail, setNotificacoesEmail] = useState(true);
  const [modoNoturno, setModoNoturno] = useState(false);

  return (
    <div className="config-page">
      <div className="config-header">
        <h1 className="config-title">Configurações</h1>
        <p className="config-subtitle">Gerencie as preferências da sua conta</p>
      </div>

      {/* Perfil */}
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

      {/* Notificações */}
      <div className="config-card">
        <div className="config-section-header">
          <div className="config-icon config-icon--notif">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </div>
          <div>
            <h2 className="config-section-title">Notificações</h2>
            <p className="config-section-desc">Escolha como deseja receber atualizações</p>
          </div>
        </div>

        <div className="config-toggle-row">
          <div className="config-toggle-left">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="config-toggle-icon">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <div>
              <p className="config-toggle-label">Notificações por Email</p>
              <p className="config-toggle-desc">Receba atualizações no seu email</p>
            </div>
          </div>
          <button
            className={`config-toggle ${notificacoesEmail ? "config-toggle--on" : ""}`}
            onClick={() => setNotificacoesEmail(!notificacoesEmail)}
            aria-checked={notificacoesEmail}
            role="switch"
          >
            <span className="config-toggle-thumb" />
          </button>
        </div>
      </div>

      {/* Modo Noturno */}
      <div className="config-card">
        <div className="config-section-header">
          <div className="config-icon config-icon--noturno">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          </div>
          <div>
            <h2 className="config-section-title">Modo Noturno</h2>
            <p className="config-section-desc">Ajuste a aparência da interface</p>
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