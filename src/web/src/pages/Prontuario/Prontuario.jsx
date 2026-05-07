import React, { useState } from "react";
import "./Prontuario.css";

// ─── Icons (inline SVG helpers) ───────────────────────────────────────────────
const Icon = {
  Dashboard: () => (
    <svg className="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="1" width="6" height="6" rx="1.2" />
      <rect x="9" y="1" width="6" height="6" rx="1.2" />
      <rect x="1" y="9" width="6" height="6" rx="1.2" />
      <rect x="9" y="9" width="6" height="6" rx="1.2" />
    </svg>
  ),
  Agenda: () => (
    <svg className="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1.5" y="2.5" width="13" height="12" rx="1.5" />
      <line x1="5" y1="1" x2="5" y2="4" />
      <line x1="11" y1="1" x2="11" y2="4" />
      <line x1="1.5" y1="6.5" x2="14.5" y2="6.5" />
    </svg>
  ),
  Prontuario: () => (
    <svg className="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="1" width="12" height="14" rx="1.5" />
      <line x1="5" y1="5.5" x2="11" y2="5.5" />
      <line x1="5" y1="8" x2="11" y2="8" />
      <line x1="5" y1="10.5" x2="8.5" y2="10.5" />
    </svg>
  ),
  Clinica: () => (
    <svg className="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.5 4.5 8 4.5 8s4.5-4.5 4.5-8c0-2.5-2-4.5-4.5-4.5z" />
      <circle cx="8" cy="6" r="1.5" />
    </svg>
  ),
  Conteudo: () => (
    <svg className="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1.5" y="1.5" width="13" height="13" rx="1.5" />
      <line x1="4" y1="5.5" x2="12" y2="5.5" />
      <line x1="4" y1="8" x2="12" y2="8" />
      <line x1="4" y1="10.5" x2="9" y2="10.5" />
    </svg>
  ),
  Ajuda: () => (
    <svg className="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="6.5" />
      <path d="M6 6.2c0-1 .9-1.8 2-1.8s2 .8 2 1.8c0 1-1 1.5-2 2v.8" />
      <circle cx="8" cy="11.5" r=".7" fill="currentColor" />
    </svg>
  ),
  Reportar: () => (
    <svg className="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 3h10l-1.5 5H4.5L3 3z" />
      <path d="M4.5 8l-1 5h9l-1-5" />
    </svg>
  ),
  Configuracoes: () => (
    <svg className="nav-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="2.2" />
      <path d="M8 1.5v1.2M8 13.3v1.2M1.5 8h1.2M13.3 8h1.2M3.2 3.2l.85.85M11.95 11.95l.85.85M3.2 12.8l.85-.85M11.95 4.05l.85-.85" />
    </svg>
  ),
  Search: () => (
    <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="7" cy="7" r="5" />
      <line x1="10.8" y1="10.8" x2="14" y2="14" />
    </svg>
  ),
  Calendar: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1.5" y="2.5" width="13" height="12" rx="1.5" />
      <line x1="5" y1="1" x2="5" y2="4" />
      <line x1="11" y1="1" x2="11" y2="4" />
      <line x1="1.5" y1="6.5" x2="14.5" y2="6.5" />
    </svg>
  ),
  Plus: ({ size = 15 }) => (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2">
      <line x1="8" y1="2" x2="8" y2="14" />
      <line x1="2" y1="8" x2="14" y2="8" />
    </svg>
  ),
  Edit: () => (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M11 2.5l2.5 2.5-8 8H3v-2.5l8-8z" />
    </svg>
  ),
  Trash: () => (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="3 5 4 14 12 14 13 5" />
      <line x1="2" y1="5" x2="14" y2="5" />
      <path d="M6.5 5V3.5h3V5" />
    </svg>
  ),
  Back: () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
      <polyline points="10 13 4 8 10 3" />
    </svg>
  ),
  Male: () => (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor">
      <circle cx="6" cy="10" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <line x1="9.2" y1="6.8" x2="14" y2="2" stroke="currentColor" strokeWidth="1.8" />
      <polyline points="10.5 2 14 2 14 5.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
    </svg>
  ),
  Pulse: () => (
    <svg className="queixa-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
      <polyline points="1 8 4 8 6 3 8 13 10 6 12 8 15 8" />
    </svg>
  ),
  CalSmall: () => (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="1.5" y="2.5" width="13" height="12" rx="1.5" />
      <line x1="5" y1="1" x2="5" y2="4" />
      <line x1="11" y1="1" x2="11" y2="4" />
      <line x1="1.5" y1="6.5" x2="14.5" y2="6.5" />
    </svg>
  ),
  BarChart: () => (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="1" y="9" width="3" height="6" />
      <rect x="6.5" y="5" width="3" height="10" />
      <rect x="12" y="2" width="3" height="13" />
    </svg>
  ),
};

// ─── Sample Data ──────────────────────────────────────────────────────────────
const initialRecords = [
  {
    id: 1,
    date: "03/05/2026",
    queixaPrincipal: "",
    escalaDor: "",
    historicoLesoes: "",
    diagnostico: "",
    observacoes: "",
  },
  {
    id: 2,
    date: "03/06/2026",
    queixaPrincipal: "",
    escalaDor: "",
    historicoLesoes: "",
    diagnostico: "",
    observacoes: "",
  },
];

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar() {
  const [activeItem, setActiveItem] = useState("clinica");

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Icon.Dashboard },
    { id: "agenda", label: "Agenda", icon: Icon.Agenda },
    { id: "prontuario", label: "Prontuário", icon: Icon.Prontuario },
  ];

  const clinicaItems = [
    { id: "clinica", label: "Clínica", icon: Icon.Clinica },
  ];

  const conteudoItems = [
    { id: "conteudo", label: "Conteúdo", icon: Icon.Conteudo },
  ];

  const suporteItems = [
    { id: "ajuda", label: "Ajuda", icon: Icon.Ajuda },
    { id: "reportar", label: "Reportar", icon: Icon.Reportar },
    { id: "configuracoes", label: "Configurações", icon: Icon.Configuracoes },
  ];

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <span className="sidebar-logo-text">
          <span className="logo-main">maya</span>
          <span className="logo-sub">yamamoto · rpo</span>
        </span>
      </div>

      {/* Gestão */}
      <span className="sidebar-section-label">Gestão</span>
      <ul className="sidebar-nav">
        {navItems.map(({ id, label, icon: NavIcon }) => (
          <li key={id} className={activeItem === id ? "active" : ""}>
            <button onClick={() => setActiveItem(id)}>
              <NavIcon />
              {label}
            </button>
          </li>
        ))}
        {clinicaItems.map(({ id, label, icon: NavIcon }) => (
          <li key={id} className={activeItem === id ? "active" : ""}>
            <button onClick={() => setActiveItem(id)}>
              <NavIcon />
              {label}
            </button>
          </li>
        ))}
        <li>
          <button className="sidebar-sub-btn">
            <Icon.Plus size={12} />
            Novo paciente
          </button>
        </li>
        {conteudoItems.map(({ id, label, icon: NavIcon }) => (
          <li key={id} className={activeItem === id ? "active" : ""}>
            <button onClick={() => setActiveItem(id)}>
              <NavIcon />
              {label}
            </button>
          </li>
        ))}
      </ul>

      {/* Suporte */}
      <span className="sidebar-section-label">Suporte</span>
      <ul className="sidebar-nav">
        {suporteItems.map(({ id, label, icon: NavIcon }) => (
          <li key={id} className={activeItem === id ? "active" : ""}>
            <button onClick={() => setActiveItem(id)}>
              <NavIcon />
              {label}
            </button>
          </li>
        ))}
      </ul>

      <div className="sidebar-spacer" />

      {/* Quick Report */}
      <div className="sidebar-quick-report">
        <p>
          <strong>Relatório rápido</strong>
          <br />
          <span style={{ fontWeight: 400, fontSize: 11 }}>
            Analise a evolução da dor e a adesão dos pacientes nos últimos 7 dias
          </span>
        </p>
        <button className="btn-generate">
          <Icon.BarChart />
          Gerar análise
        </button>
      </div>

      {/* Light mode toggle */}
      <div className="sidebar-mode-toggle">
        <span>Light mode</span>
        <label className="toggle-switch">
          <input type="checkbox" defaultChecked />
          <span className="toggle-slider" />
        </label>
      </div>

      {/* User */}
      <div className="sidebar-user">
        <div className="sidebar-user-avatar">
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--teal)" }}>MY</span>
        </div>
        <span>Maya Yamamoto</span>
        <span className="sidebar-user-dots">···</span>
      </div>
    </aside>
  );
}

// ─── Prontuario Card ──────────────────────────────────────────────────────────
function ProntuarioCard({ record, onDelete }) {
  return (
    <div className="prontuario-card">
      <div className="prontuario-card-header">
        <span className="card-date-badge">
          <Icon.CalSmall />
          {record.date}
        </span>
        <div className="card-actions">
          <button className="card-action-btn" title="Editar">
            <Icon.Edit />
          </button>
          <button className="card-action-btn delete" title="Excluir" onClick={() => onDelete(record.id)}>
            <Icon.Trash />
          </button>
        </div>
      </div>

      {/* Queixa principal */}
      <div className="form-field">
        <div className="form-field-label">
          <Icon.Pulse />
          Queixa principal
        </div>
        <div className="form-field-content">{record.queixaPrincipal}</div>
      </div>

      {/* Escala de dor + Histórico de lesões */}
      <div className="form-row">
        <div className="form-field">
          <div className="form-field-label">Escala de dor</div>
          <div className="form-field-content">{record.escalaDor}</div>
        </div>
        <div className="form-field">
          <div className="form-field-label">Histórico de lesões</div>
          <div className="form-field-content">{record.historicoLesoes}</div>
        </div>
      </div>

      {/* Diagnóstico */}
      <div className="form-field">
        <div className="form-field-label">Diagnóstico</div>
        <div className="form-field-content">{record.diagnostico}</div>
      </div>

      {/* Observações */}
      <div className="form-field">
        <div className="form-field-label">Observações</div>
        <div className="form-field-content">{record.observacoes}</div>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Prontuario() {
  const [activeTab, setActiveTab] = useState("prontuario");
  const [records, setRecords] = useState(initialRecords);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (id) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
  };

  const handleNewProntuario = () => {
    const newRecord = {
      id: Date.now(),
      date: new Date().toLocaleDateString("pt-BR"),
      queixaPrincipal: "",
      escalaDor: "",
      historicoLesoes: "",
      diagnostico: "",
      observacoes: "",
    };
    setRecords((prev) => [newRecord, ...prev]);
  };

  const filteredRecords = records.filter((r) =>
    !searchQuery ||
    r.queixaPrincipal.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.diagnostico.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="prontuario-app">
      <Sidebar />

      <div className="main-content">
        {/* Patient Header */}
        <div className="patient-header">
          <button className="back-link">
            <Icon.Back />
            Voltar para lista
          </button>

          <div className="patient-info-row">
            <div className="patient-avatar-placeholder">TO</div>

            <div className="patient-details">
              <h1 className="patient-name">Thiago Oliveira</h1>
              <div className="patient-meta">
                <span>000.000.000-00</span>
                <span className="patient-gender-badge">
                  <Icon.Male />
                  Masculino
                </span>
              </div>
            </div>

            <div className="next-appointment-card">
              <div className="next-appointment-label">Próxima consulta</div>
              <div className="next-appointment-date">05/05/2026</div>
              <div className="next-appointment-time">às 14h</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="patient-tabs">
            {[
              { id: "prontuario", label: "Prontuário" },
              { id: "plano", label: "Plano de exercício" },
              { id: "atividade", label: "Atividade" },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn${activeTab === tab.id ? " active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Prontuario Content */}
        {activeTab === "prontuario" && (
          <div className="prontuario-content">
            {/* Toolbar */}
            <div className="prontuario-toolbar">
              <div className="search-input-wrapper">
                <Icon.Search />
                <input
                  type="text"
                  placeholder="Pesquisar por queixa ou diagnóstico..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="toolbar-icon-btn" title="Calendário">
                <Icon.Calendar />
              </button>
              <button className="btn-new-prontuario" onClick={handleNewProntuario}>
                <Icon.Plus />
                Novo prontuário
              </button>
            </div>

            {/* Records */}
            <div className="prontuario-list">
              {filteredRecords.map((record) => (
                <ProntuarioCard key={record.id} record={record} onDelete={handleDelete} />
              ))}
              {filteredRecords.length === 0 && (
                <div style={{ textAlign: "center", color: "var(--text-muted)", padding: "40px 0" }}>
                  Nenhum prontuário encontrado.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "plano" && (
          <div className="prontuario-content">
            <p style={{ color: "var(--text-muted)" }}>Plano de exercício em breve.</p>
          </div>
        )}

        {activeTab === "atividade" && (
          <div className="prontuario-content">
            <p style={{ color: "var(--text-muted)" }}>Atividade em breve.</p>
          </div>
        )}
      </div>
    </div>
  );
}