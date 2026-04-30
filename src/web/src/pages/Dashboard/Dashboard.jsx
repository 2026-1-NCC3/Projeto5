import { useState, useEffect, useCallback } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Dashboard.css";

// ── Icons ──────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 20 }) => {
  const icons = {
    dashboard: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    agenda: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    prontuario: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="16" y2="17" />
      </svg>
    ),
    clinica: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    conteudo: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    ajuda: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    reportar: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    configuracoes: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    patients: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    birthday: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
    calendar: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    alert: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    chevronLeft: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    ),
    chevronRight: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    ),
    moon: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
    sun: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    ),
    sparkle: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
      </svg>
    ),
    dots: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
      </svg>
    ),
    filter: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>
    ),
  };
  return icons[name] || null;
};

// ── Mini Sparkline ─────────────────────────────────────────────────────────
const Sparkline = ({ data, color = "#38bdf8" }) => {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80, h = 32;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

// ── Avatar Placeholder ─────────────────────────────────────────────────────
const Avatar = ({ name, size = 36, color = "#0ea5e9" }) => {
  const initials = name?.split(" ").map(p => p[0]).slice(0, 2).join("") || "?";
  return (
    <div className="avatar" style={{ width: size, height: size, background: color, fontSize: size * 0.38 }}>
      {initials}
    </div>
  );
};

// ── API Hook ───────────────────────────────────────────────────────────────
const useDashboardData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `Gere dados fictícios realistas para um dashboard de clínica de fisioterapia/RPG chamada Maya Yamamoto.
Retorne APENAS JSON válido, sem markdown, com esta estrutura exata:
{
  "activePatients": <número entre 20-35>,
  "birthdays": <número entre 1-5>,
  "consultasHoje": <número entre 3-8>,
  "avaliacoesPendentes": <número entre 5-12>,
  "patientsGrowth": <porcentagem inteira entre 5-15>,
  "chartData": [
    {"month": "Jan", "completas": <num>, "emAndamento": <num>, "reagendadas": <num>},
    {"month": "Fev", "completas": <num>, "emAndamento": <num>, "reagendadas": <num>},
    {"month": "Mar", "completas": <num>, "emAndamento": <num>, "reagendadas": <num>},
    {"month": "Abr", "completas": <num>, "emAndamento": <num>, "reagendadas": <num>},
    {"month": "Mai", "completas": <num>, "emAndamento": <num>, "reagendadas": <num>},
    {"month": "Jun", "completas": <num>, "emAndamento": <num>, "reagendadas": <num>},
    {"month": "Jul", "completas": <num>, "emAndamento": <num>, "reagendadas": <num>},
    {"month": "Ago", "completas": <num>, "emAndamento": <num>, "reagendadas": <num>},
    {"month": "Set", "completas": <num>, "emAndamento": <num>, "reagendadas": <num>},
    {"month": "Out", "completas": <num>, "emAndamento": <num>, "reagendadas": <num>},
    {"month": "Nov", "completas": <num>, "emAndamento": <num>, "reagendadas": <num>},
    {"month": "Dez", "completas": <num>, "emAndamento": <num>, "reagendadas": <num>}
  ],
  "consultasRecentes": [
    {"id":1,"tipo":"Sessão de Fisioterapia","data":"Qua, 05 Abr 2025","hora":"18:30","paciente":"Ana Lima"},
    {"id":2,"tipo":"Reavaliação","data":"Qua, 05 Abr 2025","hora":"16:10","paciente":"Carlos Melo"},
    {"id":3,"tipo":"Sessão de RPG","data":"Qua, 05 Abr 2025","hora":"10:00","paciente":"Beatriz Santos"}
  ],
  "sparklinePatients": [<8 números entre 15-35>],
  "sparklineBirthdays": [<8 números entre 0-6>],
  "sparklineConsultas": [<8 números entre 2-10>],
  "sparklineAvaliacoes": [<8 números entre 4-15>]
}`,
            },
          ],
        }),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const result = await response.json();
      const text = result.content?.find(b => b.type === "text")?.text || "{}";
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      setData(parsed);
    } catch (err) {
      setError(err.message);
      // Fallback data
      setData({
        activePatients: 24,
        birthdays: 3,
        consultasHoje: 4,
        avaliacoesPendentes: 7,
        patientsGrowth: 95,
        chartData: [
          { month: "Jan", completas: 1800, emAndamento: 400, reagendadas: 200 },
          { month: "Fev", completas: 2100, emAndamento: 500, reagendadas: 300 },
          { month: "Mar", completas: 2800, emAndamento: 600, reagendadas: 400 },
          { month: "Abr", completas: 3200, emAndamento: 700, reagendadas: 350 },
          { month: "Mai", completas: 1500, emAndamento: 450, reagendadas: 250 },
          { month: "Jun", completas: 1900, emAndamento: 500, reagendadas: 300 },
          { month: "Jul", completas: 2200, emAndamento: 550, reagendadas: 280 },
          { month: "Ago", completas: 3800, emAndamento: 800, reagendadas: 500 },
          { month: "Set", completas: 4200, emAndamento: 900, reagendadas: 600 },
          { month: "Out", completas: 3600, emAndamento: 750, reagendadas: 450 },
          { month: "Nov", completas: 2600, emAndamento: 600, reagendadas: 350 },
          { month: "Dez", completas: 2100, emAndamento: 500, reagendadas: 300 },
        ],
        consultasRecentes: [
          { id: 1, tipo: "Sessão de Fisioterapia", data: "Qua, 05 Abr 2025", hora: "18:30", paciente: "Ana Lima" },
          { id: 2, tipo: "Reavaliação", data: "Qua, 05 Abr 2025", hora: "16:10", paciente: "Carlos Melo" },
          { id: 3, tipo: "Sessão de RPG", data: "Qua, 05 Abr 2025", hora: "10:00", paciente: "Beatriz Santos" },
        ],
        sparklinePatients: [18, 20, 19, 22, 21, 23, 22, 24],
        sparklineBirthdays: [2, 1, 3, 2, 4, 2, 3, 3],
        sparklineConsultas: [3, 5, 4, 6, 5, 4, 5, 4],
        sparklineAvaliacoes: [5, 6, 7, 8, 7, 8, 7, 7],
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);
  return { data, loading, error, refetch: fetchData };
};

// ── Stat Card ──────────────────────────────────────────────────────────────
const StatCard = ({ icon, label, value, badge, badgeColor, sparkline, sparkColor, loading }) => (
  <div className="stat-card">
    <div className="stat-card__header">
      <div className="stat-card__icon">{icon}</div>
      {badge && <span className="stat-card__badge" style={{ background: badgeColor }}>{badge}</span>}
    </div>
    <div className="stat-card__body">
      <span className="stat-card__label">{label}</span>
      {loading ? (
        <div className="skeleton skeleton--value" />
      ) : (
        <span className="stat-card__value">{value}</span>
      )}
    </div>
    <div className="stat-card__spark">
      {loading ? <div className="skeleton skeleton--spark" /> : <Sparkline data={sparkline} color={sparkColor} />}
    </div>
  </div>
);

// ── Calendar Mini ──────────────────────────────────────────────────────────
const MiniCalendar = ({ currentDate, onPrev, onNext }) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString("pt-BR", { month: "long", year: "numeric" });
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
  const todayDay = isCurrentMonth ? today.getDate() : -1;
  const days = ["D", "S", "T", "Q", "Q", "S", "S"];

  return (
    <div className="mini-calendar">
      <div className="mini-calendar__nav">
        <button onClick={onPrev}><Icon name="chevronLeft" size={16} /></button>
        <span className="mini-calendar__month">{monthName.charAt(0).toUpperCase() + monthName.slice(1)}</span>
        <button onClick={onNext}><Icon name="chevronRight" size={16} /></button>
      </div>
      <div className="mini-calendar__grid">
        {days.map((d, i) => <span key={i} className="mini-calendar__weekday">{d}</span>)}
        {Array(firstDay).fill(null).map((_, i) => <span key={`e${i}`} />)}
        {Array(daysInMonth).fill(null).map((_, i) => (
          <span key={i + 1} className={`mini-calendar__day${i + 1 === todayDay ? " mini-calendar__day--today" : ""}`}>
            {i + 1}
          </span>
        ))}
      </div>
    </div>
  );
};

// ── Consulta Item ──────────────────────────────────────────────────────────
const ConsultaItem = ({ consulta }) => {
  const colors = ["#0ea5e9", "#38bdf8", "#0284c7", "#0369a1"];
  const color = colors[consulta.id % colors.length];
  return (
    <div className="consulta-item">
      <div className="consulta-item__info">
        <span className="consulta-item__tipo">{consulta.tipo}</span>
        <span className="consulta-item__datetime">
          <Icon name="calendar" size={12} /> {consulta.data}, {consulta.hora}
        </span>
      </div>
      <Avatar name={consulta.paciente} size={34} color={color} />
    </div>
  );
};

// ── Custom Tooltip ─────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip__label">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>
          {p.name}: <strong>{p.value.toLocaleString("pt-BR")}</strong>
        </p>
      ))}
    </div>
  );
};

// ── Main Dashboard ─────────────────────────────────────────────────────────
export default function Dashboard() {
  const { data, loading, error, refetch } = useDashboardData();
  const [calendarDate, setCalendarDate] = useState(new Date(2026, 2, 1));
  const [chartPeriod, setChartPeriod] = useState("Mensal");

  const totalConsultas = data?.chartData?.reduce((s, m) => s + m.completas + m.emAndamento + m.reagendadas, 0) || 0;
  const totalCanceladas = data?.chartData?.reduce((s, m) => s + m.reagendadas, 0) || 0;
  const totalReagendadas = Math.round(totalCanceladas * 0.6);

  return (
    <div className="dashboard">
      <main className="main">
        {/* Header */}
        <div className="main__header">
          <h1 className="main__greeting">Bem-vinda de volta, Maya!</h1>
          {error && (
            <div className="main__error">
              <span>⚠ Dados de fallback sendo exibidos.</span>
              <button onClick={refetch}>Tentar novamente</button>
            </div>
          )}
        </div>

        {/* Stat Cards */}
        <div className="stats-grid">
          <StatCard
            icon={<Icon name="patients" size={22} />}
            label="Pacientes Ativos"
            value={data?.activePatients}
            badge={`+${data?.patientsGrowth}%`}
            badgeColor="#22c55e"
            sparkline={data?.sparklinePatients}
            sparkColor="#38bdf8"
            loading={loading}
          />
          <StatCard
            icon={<Icon name="birthday" size={22} />}
            label="Aniversários"
            value={data?.birthdays}
            badge="Não se esqueça"
            badgeColor="#f59e0b"
            sparkline={data?.sparklineBirthdays}
            sparkColor="#7dd3fc"
            loading={loading}
          />
          <StatCard
            icon={<Icon name="calendar" size={22} />}
            label="Consultas Hoje"
            value={data?.consultasHoje}
            badge="Próxima Hoje 14:00"
            badgeColor="#0ea5e9"
            sparkline={data?.sparklineConsultas}
            sparkColor="#0ea5e9"
            loading={loading}
          />
          <StatCard
            icon={<Icon name="alert" size={22} />}
            label="Avaliações Pendentes"
            value={data?.avaliacoesPendentes}
            badge="2 com prazo para hoje"
            badgeColor="#ef4444"
            sparkline={data?.sparklineAvaliacoes}
            sparkColor="#bae6fd"
            loading={loading}
          />
        </div>

        {/* Content Grid */}
        <div className="content-grid">
          {/* Chart Section */}
          <div className="chart-section">
            <div className="chart-section__header">
              <h2 className="chart-section__title">Estatística das Consultas</h2>
              <select
                className="chart-section__period"
                value={chartPeriod}
                onChange={e => setChartPeriod(e.target.value)}
              >
                <option>Mensal</option>
                <option>Semanal</option>
                <option>Anual</option>
              </select>
            </div>

            {/* Totals */}
            <div className="chart-totals">
              <div className="chart-total">
                <span className="chart-total__dot" style={{ background: "#0ea5e9" }} />
                <span className="chart-total__label">Todas Consultas</span>
                {loading ? <div className="skeleton skeleton--total" /> : (
                  <span className="chart-total__value">{totalConsultas.toLocaleString("pt-BR")}</span>
                )}
              </div>
              <div className="chart-total">
                <span className="chart-total__dot" style={{ background: "#ef4444" }} />
                <span className="chart-total__label">Canceladas</span>
                {loading ? <div className="skeleton skeleton--total" /> : (
                  <span className="chart-total__value">{totalCanceladas.toLocaleString("pt-BR")}</span>
                )}
              </div>
              <div className="chart-total">
                <span className="chart-total__dot" style={{ background: "#38bdf8" }} />
                <span className="chart-total__label">Reagendadas</span>
                {loading ? <div className="skeleton skeleton--total" /> : (
                  <span className="chart-total__value">{totalReagendadas.toLocaleString("pt-BR")}</span>
                )}
              </div>
            </div>

            {/* Bar Chart */}
            <div className="chart-wrapper">
              {loading ? (
                <div className="skeleton skeleton--chart" />
              ) : (
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={data?.chartData} barSize={14} barGap={2}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.15)" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(14,165,233,0.05)" }} />
                    <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                    <Bar dataKey="completas" name="Completas" fill="#0ea5e9" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="emAndamento" name="Em andamento" fill="#38bdf8" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="reagendadas" name="Reagendadas" fill="#0369a1" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Consultas Side Panel */}
          <div className="consultas-panel">
            <div className="consultas-panel__header">
              <h2 className="consultas-panel__title">Consultas</h2>
              <button className="consultas-panel__filter">
                <Icon name="filter" size={14} /> Filtro
              </button>
            </div>

            <MiniCalendar
              currentDate={calendarDate}
              onPrev={() => setCalendarDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
              onNext={() => setCalendarDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
            />

            <div className="consultas-list">
              {loading
                ? [1, 2, 3].map(i => <div key={i} className="skeleton skeleton--consulta" />)
                : data?.consultasRecentes?.map(c => <ConsultaItem key={c.id} consulta={c} />)
              }
            </div>

            <button className="consultas-panel__view-all">Visualizar todas consultas</button>
          </div>
        </div>
      </main>
    </div>
  );
}