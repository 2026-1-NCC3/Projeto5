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
import api from "../../services/api";

// ── Icons ──────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 20 }) => {
  const icons = {
    patients: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),

    birthday: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),

    calendar: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),

    alert: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),

    filter: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
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
  };

  return icons[name] || null;
};

// ── Sparkline ──────────────────────────────────────────────────────────────
const Sparkline = ({ data, color = "#38bdf8" }) => {
  if (!data || data.length < 2) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const w = 80;
  const h = 32;

  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;

    return `${x},${y}`;
  }).join(" ");

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// ── Avatar ─────────────────────────────────────────────────────────────────
const Avatar = ({ name, size = 36 }) => {
  const initials =
    name?.split(" ").map(p => p[0]).slice(0, 2).join("") || "?";

  return (
    <div
      className="avatar"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
      }}
    >
      {initials}
    </div>
  );
};

// ── Hook Dashboard ─────────────────────────────────────────────────────────
const useDashboardData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const [
        pacientesRes,
        agendamentosRes,
      ] = await Promise.all([
        api.get("/api/patients"),
        api.get("/api/appointments"),
      ]);

      const pacientes = pacientesRes.data || [];
      const agendamentos = agendamentosRes.data || [];

      const activePatients = pacientes.length;

      const hoje = new Date().toISOString().split("T")[0];

      const consultasHoje = agendamentos.filter(a =>
        a.appointment_date?.startsWith(hoje)
      ).length;

      const mesAtual = new Date().getMonth();

      const birthdays = pacientes.filter(p => {
        if (!p.birth_date) return false;

        return new Date(p.birth_date).getMonth() === mesAtual;
      }).length;

      const consultasRecentes = agendamentos
        .slice(0, 5)
        .map(a => ({
          id: a.id,
          tipo: a.notes || "Consulta",
          data: new Date(a.appointment_date).toLocaleDateString("pt-BR"),
          hora: new Date(a.appointment_date).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          paciente: a.patients?.name || "Paciente",
        }));

      const meses = [
        "Jan","Fev","Mar","Abr","Mai","Jun",
        "Jul","Ago","Set","Out","Nov","Dez"
      ];

      const chartData = meses.map((mes, index) => {
        const consultasMes = agendamentos.filter(a => {
          if (!a.appointment_date) return false;

          return new Date(a.appointment_date).getMonth() === index;
        });

        return {
          month: mes,
          completas: consultasMes.length,
          emAndamento: 0,
          reagendadas: 0,
        };
      });

      setData({
        activePatients,
        birthdays,
        consultasHoje,
        avaliacoesPendentes: 0,
        patientsGrowth: 12,

        chartData,

        consultasRecentes,

        sparklinePatients: [12,14,16,18,20,22,24,activePatients],
        sparklineBirthdays: [1,2,1,3,2,4,3,birthdays],
        sparklineConsultas: [2,3,4,3,5,6,4,consultasHoje],
        sparklineAvaliacoes: [1,2,3,2,4,5,4,0],
      });

    } catch (err) {
      console.error("Erro dashboard:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading };
};

// ── Stat Card ──────────────────────────────────────────────────────────────
const StatCard = ({
  icon,
  label,
  value,
  badge,
  badgeColor,
  sparkline,
  sparkColor,
  loading,
}) => (
  <div className="stat-card">
    <div className="stat-card__header">
      <div className="stat-card__icon">{icon}</div>

      {badge && (
        <span
          className="stat-card__badge"
          style={{ background: badgeColor }}
        >
          {badge}
        </span>
      )}
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
      {loading ? (
        <div className="skeleton skeleton--spark" />
      ) : (
        <Sparkline data={sparkline} color={sparkColor} />
      )}
    </div>
  </div>
);

// ── Main ───────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const { data, loading } = useDashboardData();

  const totalConsultas =
    data?.chartData?.reduce(
      (s, m) => s + m.completas + m.emAndamento + m.reagendadas,
      0
    ) || 0;

  return (
    <div className="dashboard">
      <main className="main">

        <div className="main__header">
          <h1 className="main__greeting">
            Bem-vinda de volta, Maya!
          </h1>
        </div>

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
            badge="Este mês"
            badgeColor="#f59e0b"
            sparkline={data?.sparklineBirthdays}
            sparkColor="#7dd3fc"
            loading={loading}
          />

          <StatCard
            icon={<Icon name="calendar" size={22} />}
            label="Consultas Hoje"
            value={data?.consultasHoje}
            badge="Agenda"
            badgeColor="#0ea5e9"
            sparkline={data?.sparklineConsultas}
            sparkColor="#0ea5e9"
            loading={loading}
          />

          <StatCard
            icon={<Icon name="alert" size={22} />}
            label="Avaliações Pendentes"
            value={data?.avaliacoesPendentes}
            badge="Pendentes"
            badgeColor="#ef4444"
            sparkline={data?.sparklineAvaliacoes}
            sparkColor="#bae6fd"
            loading={loading}
          />
        </div>

        <div className="content-grid">

          {/* GRÁFICO */}
          <div className="chart-section">

            <div className="chart-section__header">
              <h2 className="chart-section__title">
                Estatística das Consultas
              </h2>
            </div>

            <div className="chart-totals">
              <div className="chart-total">
                <span
                  className="chart-total__dot"
                  style={{ background: "#0ea5e9" }}
                />

                <span className="chart-total__label">
                  Total de Consultas
                </span>

                <span className="chart-total__value">
                  {totalConsultas}
                </span>
              </div>
            </div>

            <div className="chart-wrapper">

              {loading ? (
                <div className="skeleton skeleton--chart" />
              ) : (
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={data?.chartData} barSize={18}>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(148,163,184,0.15)"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12, fill: "#94a3b8" }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <YAxis
                      tick={{ fontSize: 12, fill: "#94a3b8" }}
                      axisLine={false}
                      tickLine={false}
                    />

                    <Tooltip />

                    <Legend />

                    <Bar
                      dataKey="completas"
                      name="Consultas"
                      fill="#0ea5e9"
                      radius={[4, 4, 0, 0]}
                    />

                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* CONSULTAS */}
          <div className="consultas-panel">

            <div className="consultas-panel__header">
              <h2 className="consultas-panel__title">
                Consultas Recentes
              </h2>

              <button className="consultas-panel__filter">
                <Icon name="filter" size={14} />
                Filtro
              </button>
            </div>

            <div className="consultas-list">

              {loading ? (
                <p>Carregando...</p>
              ) : (
                data?.consultasRecentes?.map(c => (
                  <div key={c.id} className="consulta-item">

                    <div className="consulta-item__info">
                      <span className="consulta-item__tipo">
                        {c.tipo}
                      </span>

                      <span className="consulta-item__datetime">
                        {c.data} • {c.hora}
                      </span>
                    </div>

                    <Avatar name={c.paciente} />

                  </div>
                ))
              )}

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}