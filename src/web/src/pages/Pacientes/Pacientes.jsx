import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import './Pacientes.css';
import api from '../../services/api';

const STATUS_CORES = {
  ativo:    { bg: '#e6f9f1', color: '#27ae60', label: 'Ativo' },
  pendente: { bg: '#fff8e1', color: '#f5a623', label: 'Pendente' },
  alerta:   { bg: '#fdecea', color: '#e05b5b', label: 'Alerta' },
};

const PRIORIDADE_CORES = {
  normal: '#f5a623',
  alta:   '#e05b5b',
  baixa:  '#37A6BA',
};

const formVazio = {
  name: '', cpf: '', birth_date: '', email: '', phone: '',
  diagnostico: '', prioridade: 'normal', status_conta: 'pendente',
};

const formatarCPF = (valor) => {
  valor = valor.replace(/\D/g, '');
  valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
  valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
  valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  return valor.slice(0, 14);
};

export default function Pacientes() {
  const [pacientes,  setPacientes]  = useState([]);
  const [busca,      setBusca]      = useState('');
  const [modal,      setModal]      = useState(false);
  const [form,       setForm]       = useState(formVazio);
  const [loading,    setLoading]    = useState(false);
  const [loadingDados, setLoadingDados] = useState(true);
  const [erro,       setErro]       = useState('');
  const [menuAberto, setMenuAberto] = useState(null);
  const [editando,   setEditando]   = useState(null);

  const carregar = async () => {
    setLoadingDados(true);
    try {
      const { data } = await api.get('/api/patients');
      setPacientes(data);
    } catch (err) { console.error('Erro ao carregar pacientes:', err); }
    finally { setLoadingDados(false); }
  };

  useEffect(() => { carregar(); }, []);

  // ── Cálculo dos cards ──────────────────────────────────────────
  const agora = new Date();
  const totalPacientes  = pacientes.length;
  const pacientesAtivos = pacientes.filter(p => p.status_conta === 'ativo').length;
  const novosMes        = pacientes.filter(p => {
    const d = new Date(p.created_at);
    return d.getFullYear() === agora.getFullYear() && d.getMonth() === agora.getMonth();
  }).length;

  const cards = [
    {
      label: 'Total de pacientes',
      value: totalPacientes,
      badge: pacientesAtivos > 0 ? `${Math.round((pacientesAtivos / totalPacientes) * 100)}% ativos` : '—',
      badgeType: 'positive',
      sub: 'cadastrados na plataforma',
    },
    {
      label: 'Pacientes ativos',
      value: pacientesAtivos,
      badge: totalPacientes > 0 ? `${Math.round((pacientesAtivos / totalPacientes) * 100)}%` : '—',
      badgeType: 'neutral',
      sub: 'da capacidade ideal',
    },
    {
      label: 'Novos este mês',
      value: novosMes,
      badge: novosMes > 0 ? `+${novosMes}` : '0',
      badgeType: 'positive',
      sub: 'do último mês',
    },
  ];
  // ───────────────────────────────────────────────────────────────

  const abrirNovo = () => {
    setForm(formVazio);
    setEditando(null);
    setErro('');
    setModal(true);
  };

  const abrirEditar = (p) => {
    setForm({
      name:         p.name,
      cpf:          p.cpf || '',
      birth_date:   p.birth_date || '',
      email:        p.email || '',
      phone:        p.phone || '',
      diagnostico:  p.diagnostico || '',
      prioridade:   p.prioridade || 'normal',
      status_conta: p.status_conta || 'pendente',
    });
    setEditando(p.id);
    setErro('');
    setModal(true);
    setMenuAberto(null);
  };

  const deletar = async (id) => {
    if (!confirm('Remover este paciente?')) return;
    try {
      await api.delete(`/api/patients/${id}`);
      carregar();
    } catch (err) { console.error('Erro ao deletar paciente:', err); }
    setMenuAberto(null);
  };

  const salvar = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);
    try {
      if (editando) {
        await api.put(`/api/patients/${editando}`, form);
      } else {
        await api.post('/api/patients', form);
      }
      await carregar();
      setModal(false);
    } catch {
      setErro('Erro ao salvar paciente.');
    } finally {
      setLoading(false);
    }
  };

  const filtrados = pacientes.filter(p =>
    p.name.toLowerCase().includes(busca.toLowerCase()) ||
    (p.email || '').toLowerCase().includes(busca.toLowerCase())
  );

  const formatarData = (data) => {
    if (!data) return '—';
    return new Date(data).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  return (
    <div className="pac-page">

      {/* ── Topo: título + descrição ── */}
      <div className="pac-header">
        <div>
          <h2 className="pac-titulo">Clínica</h2>
          <p className="pac-descricao">
            Gerencie seus pacientes, acompanhe status de tratamento e organize novos cadastros na plataforma
          </p>
        </div>
      </div>

      {/* ── Cards de estatísticas ── */}
      <div className="pac-cards">
        {cards.map((card) => (
          <div className="pac-card" key={card.label}>
            <span className="pac-card-label">{card.label}</span>
            <div className="pac-card-value">
              {loadingDados
                ? <span className="pac-skeleton" />
                : card.value}
            </div>
            <div className="pac-card-footer">
              <span className={`pac-badge pac-badge--${card.badgeType}`}>{card.badge}</span>
              <span className="pac-card-sub">{card.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Toolbar: busca + botões ── */}
      <div className="pac-topo">
        <div className="pac-toolbar">
          <div className="pac-busca">
            <Icon icon="solar:magnifer-linear" width="16" color="#aaa" />
            <input
              placeholder="Pesquisar"
              value={busca}
              onChange={e => setBusca(e.target.value)}
            />
          </div>
          <button className="pac-btn-filtro">
            <Icon icon="solar:filter-linear" width="16" />
            Filtro
          </button>
          <button className="pac-btn-icone">
            <Icon icon="solar:share-circle-linear" width="18" />
          </button>
          <button className="pac-btn-novo" onClick={abrirNovo}>
            <Icon icon="solar:add-circle-bold" width="18" />
            Novo
          </button>
        </div>
      </div>

      {/* ── Tabela ── */}
      <div className="pac-tabela-wrap">
        <table className="pac-tabela">
          <thead>
            <tr>
              <th>Paciente</th>
              <th>Última consulta</th>
              <th>Status</th>
              <th>Diagnóstico</th>
              <th>Prioridade</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map(p => {
              const status   = STATUS_CORES[p.status_conta] || STATUS_CORES.pendente;
              const priorCor = PRIORIDADE_CORES[p.prioridade] || PRIORIDADE_CORES.normal;
              return (
                <tr key={p.id}>
                  <td>
                    <div className="pac-nome-cell">
                      <div className="pac-avatar">{p.name[0].toUpperCase()}</div>
                      <span className="pac-nome">{p.name}</span>
                    </div>
                  </td>
                  <td className="pac-data">{formatarData(p.created_at)}</td>
                  <td>
                    <span className="pac-status" style={{ background: status.bg, color: status.color }}>
                      {status.label}
                    </span>
                  </td>
                  <td className="pac-diag">{p.diagnostico || '—'}</td>
                  <td>
                    <div className="pac-prioridade">
                      <span className="pac-prioridade-dot" style={{ background: priorCor }} />
                      <span className="pac-prioridade-txt" style={{ color: priorCor }}>
                        {p.prioridade ? p.prioridade.charAt(0).toUpperCase() + p.prioridade.slice(1) : 'Normal'}
                      </span>
                    </div>
                  </td>
                  <td className="pac-menu-cell">
                    <div style={{ position: 'relative' }}>
                      <button
                        className="pac-menu-btn"
                        onClick={() => setMenuAberto(menuAberto === p.id ? null : p.id)}
                      >
                        <Icon icon="solar:menu-dots-bold" width="18" />
                      </button>
                      {menuAberto === p.id && (
                        <div className="pac-dropdown">
                          <button onClick={() => abrirEditar(p)}>
                            <Icon icon="solar:pen-linear" width="14" /> Editar
                          </button>
                          <button onClick={() => deletar(p.id)} className="pac-drop-danger">
                            <Icon icon="solar:trash-bin-trash-linear" width="14" /> Remover
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
            {filtrados.length === 0 && (
              <tr>
                <td colSpan={6} className="pac-vazio">Nenhum paciente encontrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── Modal ── */}
      {modal && (
        <div className="pac-overlay" onClick={() => setModal(false)}>
          <div className="pac-modal" onClick={e => e.stopPropagation()}>
            <div className="pac-modal-header">
              <h3>{editando ? 'Editar paciente' : 'Novo paciente'}</h3>
              <button className="pac-modal-fechar" onClick={() => setModal(false)}>
                <Icon icon="solar:close-circle-linear" width="22" />
              </button>
            </div>

            <form onSubmit={salvar} className="pac-form">
              <div className="pac-form-grid">
                <div className="pac-field">
                  <label>Nome completo *</label>
                  <input
                    type="text"
                    placeholder="Nome Completo"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="pac-field">
                  <label>CPF</label>
                  <input
                    type="text"
                    placeholder="000.000.000-00"
                    value={form.cpf}
                    onChange={e => setForm(f => ({ ...f, cpf: formatarCPF(e.target.value) }))}
                  />
                </div>
                <div className="pac-field">
                  <label>Data de nascimento</label>
                  <input
                    type="date"
                    value={form.birth_date}
                    onChange={e => setForm(f => ({ ...f, birth_date: e.target.value }))}
                  />
                </div>
                <div className="pac-field">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="emaildopaciente@email.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  />
                </div>
                <div className="pac-field">
                  <label>Telefone</label>
                  <input
                    type="text"
                    placeholder="(11) 99999-9999"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  />
                </div>
                <div className="pac-field">
                  <label>Diagnóstico</label>
                  <input
                    type="text"
                    placeholder="Ex: Escoliose Idiopática"
                    value={form.diagnostico}
                    onChange={e => setForm(f => ({ ...f, diagnostico: e.target.value }))}
                  />
                </div>
                <div className="pac-field">
                  <label>Prioridade</label>
                  <select
                    value={form.prioridade}
                    onChange={e => setForm(f => ({ ...f, prioridade: e.target.value }))}
                  >
                    <option value="baixa">Baixa</option>
                    <option value="normal">Normal</option>
                    <option value="alta">Alta</option>
                  </select>
                </div>
              </div>

              {erro && <p className="pac-erro">{erro}</p>}

              <div className="pac-modal-footer">
                <button type="button" className="pac-btn-cancelar" onClick={() => setModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="pac-btn-salvar" disabled={loading}>
                  {loading ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}