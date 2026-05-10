import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import api from '../../services/api';
import './Agenda.css';

const HORAS = [
  '08:00','09:00','10:00','11:00',
  '12:00','13:00','14:00','15:00',
  '16:00','17:00','18:00'
];

const DIAS_SEMANA = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
const MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

function getSemanaCompleta(dataBase) {
  const dias = [];
  const base = new Date(dataBase);
  const diaSemana = base.getDay();
  const domingo = new Date(base);
  domingo.setDate(base.getDate() - diaSemana);
  for (let i = 0; i < 7; i++) {
    const d = new Date(domingo);
    d.setDate(domingo.getDate() + i);
    dias.push(d);
  }
  return dias;
}

function getDiasMes(dataBase) {
  const ano = dataBase.getFullYear();
  const mes = dataBase.getMonth();
  const primeiroDia = new Date(ano, mes, 1);
  const ultimoDia   = new Date(ano, mes + 1, 0);
  const dias = [];
  for (let i = 0; i < primeiroDia.getDay(); i++) dias.push(null);
  for (let i = 1; i <= ultimoDia.getDate(); i++) dias.push(new Date(ano, mes, i));
  return dias;
}

function formatarMes(data) {
  return data
    .toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
    .replace(/^\w/, c => c.toUpperCase());
}

function formatarIntervalo(dias) {
  const fmt = d => d.toLocaleDateString('pt-BR');
  return `${fmt(dias[0])} — ${fmt(dias[dias.length - 1])}`;
}

function mesmoDia(d1, d2) {
  if (!d1 || !d2) return false;
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth()    === d2.getMonth()    &&
         d1.getDate()     === d2.getDate();
}

const formVazio = { patient_id: '', problema: '', data: '', horario: '' };

export default function Agenda() {
  const [hoje]                            = useState(new Date());
  const [dataBase, setDataBase]           = useState(new Date());
  const [filtro, setFiltro]               = useState('Próximos');
  const [visualizacao, setVisualizacao]   = useState('Semana');
  const [agendamentos, setAgendamentos]   = useState([]);
  const [modal, setModal]                 = useState(false);
  const [modalCancelar, setModalCancelar] = useState(false);
  const [agendSelecionado, setAgendSelecionado] = useState(null);
  const [form, setForm]                   = useState(formVazio);
  const [hoveredCelula, setHoveredCelula] = useState(null);
  const [pacientes, setPacientes]         = useState([]);
  const [busca, setBusca]                 = useState('');
  const [loadingForm, setLoadingForm]     = useState(false);
  const [erroForm, setErroForm]           = useState('');

  const diasSemana = getSemanaCompleta(dataBase);
  const diasMes    = getDiasMes(dataBase);

  const mapearAgendamento = (a) => ({
    id:         a.id,
    patient_id: a.patient_id,
    paciente:   a.patients?.name || '—',
    problema:   a.notes || '',
    status:     a.status || 'scheduled',
    data:       a.appointment_date?.split('T')[0],
    horario:    a.appointment_date?.slice(11, 16),
  });

  useEffect(() => {
    async function fetchDados() {
      try {
        const [{ data: pacs }, { data: agends }] = await Promise.all([
          api.get('/api/patients'),
          api.get('/api/appointments'),
        ]);
        setPacientes(pacs || []);
        setAgendamentos((agends || []).map(mapearAgendamento));
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
      }
    }
    fetchDados();
  }, []);


  const agendsFiltrados = agendamentos.filter(a => {
    const hojeStr = hoje.toISOString().split('T')[0];
    if (filtro === 'Próximos')   return a.status !== 'cancelled' && a.data >= hojeStr;
    if (filtro === 'Cancelados') return a.status === 'cancelled';
    return true;
  }).filter(a =>
    !busca.trim() || a.paciente.toLowerCase().includes(busca.toLowerCase())
  );


  const avancar = () => {
    const nova = new Date(dataBase);
    if (visualizacao === 'Dia')    nova.setDate(nova.getDate() + 1);
    if (visualizacao === 'Semana') nova.setDate(nova.getDate() + 7);
    if (visualizacao === 'Mês')    nova.setMonth(nova.getMonth() + 1);
    setDataBase(nova);
  };

  const voltar = () => {
    const nova = new Date(dataBase);
    if (visualizacao === 'Dia')    nova.setDate(nova.getDate() - 1);
    if (visualizacao === 'Semana') nova.setDate(nova.getDate() - 7);
    if (visualizacao === 'Mês')    nova.setMonth(nova.getMonth() - 1);
    setDataBase(nova);
  };

  const irParaHoje = () => setDataBase(new Date());
  const ehHoje = (d) => mesmoDia(d, hoje);

  // ── Label de navegação ──
  const labelNavegacao = () => {
    if (visualizacao === 'Dia') {
      return dataBase.toLocaleDateString('pt-BR', {
        weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
      }).replace(/^\w/, c => c.toUpperCase());
    }
    if (visualizacao === 'Semana') return formatarIntervalo(diasSemana);
    return `${MESES[dataBase.getMonth()]} ${dataBase.getFullYear()}`;
  };


  const abrirModal = (dia, hora) => {
    const dataStr = dia ? dia.toISOString().split('T')[0] : '';
    setForm({ ...formVazio, horario: hora || '', data: dataStr });
    setErroForm('');
    setModal(true);
  };

  const salvarAgendamento = async (e) => {
    e.preventDefault();
    setErroForm('');
    setLoadingForm(true);
    try {
      const { data } = await api.post('/api/appointments', {
        patient_id:       form.patient_id,
        appointment_date: `${form.data}T${form.horario}:00`,
        status:           'scheduled',
        notes:            form.problema,
      });
      setAgendamentos(prev => [...prev, mapearAgendamento(data)]);
      setModal(false);
      setForm(formVazio);
    } catch (err) {
      console.error('Erro ao salvar agendamento:', err);
      setErroForm('Erro ao salvar. Tente novamente.');
    } finally {
      setLoadingForm(false);
    }
  };


  const abrirModalCancelar = (agend, e) => {
    e.stopPropagation();
    setAgendSelecionado(agend);
    setModalCancelar(true);
  };

  const confirmarCancelar = async () => {
    try {
      await api.patch(`/api/appointments/${agendSelecionado.id}`, { status: 'cancelled' });
      setAgendamentos(prev =>
        prev.map(a => a.id === agendSelecionado.id ? { ...a, status: 'cancelled' } : a)
      );
    } catch (err) {
      console.error('Erro ao cancelar:', err);
    } finally {
      setModalCancelar(false);
      setAgendSelecionado(null);
    }
  };


  const getAgendCelula = (dia, hora) => {
    const dataStr = dia.toISOString().split('T')[0];
    return agendsFiltrados.find(a => a.data === dataStr && a.horario === hora);
  };

  const getAgendsDia = (dia) => {
    if (!dia) return [];
    const dataStr = dia.toISOString().split('T')[0];
    return agendsFiltrados.filter(a => a.data === dataStr);
  };

  return (
    <div className="agenda-container">


      <div className="agenda-header">
        <h2 className="agenda-titulo">Agendamentos</h2>
        <div className="agenda-acoes">
          <div className="filtros-tabs">
            {['Próximos', 'Cancelados'].map(f => (
              <button key={f} className={`tab ${filtro === f ? 'tab-ativa' : ''}`} onClick={() => setFiltro(f)}>
                {f}
              </button>
            ))}
          </div>
          <div className="agenda-toolbar">
            <div className="pesquisa">
              <Icon icon="solar:magnifer-linear" width="16" />
              <input
                placeholder="Pesquisar paciente..."
                value={busca}
                onChange={e => setBusca(e.target.value)}
              />
              {busca && (
                <button className="pesquisa-limpar" onClick={() => setBusca('')}>
                  <Icon icon="solar:close-circle-linear" width="14" />
                </button>
              )}
            </div>
            <button className="btn-novo" onClick={() => abrirModal(null, null)}>
              <Icon icon="solar:add-circle-bold" width="18" /> Novo
            </button>
          </div>
        </div>
      </div>


      <div className="agenda-nav">
        <div className="nav-esquerda">
          <span className="mes-ano">{formatarMes(dataBase)}</span>
          <button className="btn-hoje" onClick={irParaHoje}>Hoje</button>
        </div>
        <div className="nav-direita">
          <div className="vis-tabs">
            {['Dia', 'Semana', 'Mês'].map(v => (
              <button key={v} className={`vis-tab ${visualizacao === v ? 'vis-ativa' : ''}`} onClick={() => setVisualizacao(v)}>
                {v}
              </button>
            ))}
          </div>
          <div className="nav-setas">
            <button className="seta-btn" onClick={voltar}>
              <Icon icon="solar:alt-arrow-left-linear" width="16" />
            </button>
            <span className="intervalo">{labelNavegacao()}</span>
            <button className="seta-btn" onClick={avancar}>
              <Icon icon="solar:alt-arrow-right-linear" width="16" />
            </button>
          </div>
        </div>
      </div>


      {visualizacao === 'Dia' && (
        <div className="calendario-wrap">
          <div className="cal-header cal-header--dia">
            <div className="cal-hora-header" />
            <div className={`cal-dia-header ${ehHoje(dataBase) ? 'hoje' : ''}`}>
              <span className="dia-nome">{DIAS_SEMANA[dataBase.getDay()].toUpperCase()} {dataBase.getDate()}</span>
            </div>
          </div>
          <div className="cal-body">
            {HORAS.map(hora => {
              const agend = getAgendCelula(dataBase, hora);
              return (
                <div key={hora} className="cal-linha cal-linha--dia">
                  <div className="cal-hora">{hora}</div>
                  <div
                    className={`cal-celula cal-celula--dia ${ehHoje(dataBase) ? 'celula-hoje' : ''}`}
                    onClick={() => !agend && abrirModal(dataBase, hora)}
                  >
                    {agend ? (
                      <div className="agend-card">
                        <div className="agend-card-top">
                          <p className="agend-nome">{agend.paciente}</p>
                          <button className="agend-cancelar-btn" onClick={e => abrirModalCancelar(agend, e)}>
                            <Icon icon="solar:close-circle-linear" width="14" />
                          </button>
                        </div>
                        <p className="agend-prob">{agend.problema}</p>
                      </div>
                    ) : (
                      <div className="celula-hover-hint">
                        <Icon icon="solar:add-circle-linear" width="16" color="#37A6BA" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {visualizacao === 'Semana' && (
        <div className="calendario-wrap">
          <div className="cal-header">
            <div className="cal-hora-header" />
            {diasSemana.map((d, i) => (
              <div key={i} className={`cal-dia-header ${ehHoje(d) ? 'hoje' : ''}`}>
                <span className="dia-nome">{DIAS_SEMANA[d.getDay()].toUpperCase()} {d.getDate()}</span>
              </div>
            ))}
          </div>
          <div className="cal-body">
            {HORAS.map(hora => (
              <div key={hora} className="cal-linha">
                <div className="cal-hora">{hora}</div>
                {diasSemana.map((d, i) => {
                  const agend = getAgendCelula(d, hora);
                  const isHovered = hoveredCelula?.dia === i && hoveredCelula?.hora === hora;
                  return (
                    <div
                      key={i}
                      className={`cal-celula ${ehHoje(d) ? 'celula-hoje' : ''}`}
                      onClick={() => abrirModal(d, hora)}
                      onMouseEnter={() => setHoveredCelula({ dia: i, hora })}
                      onMouseLeave={() => setHoveredCelula(null)}
                    >
                      {agend ? (
                        <div className="agend-card">
                          <div className="agend-card-top">
                            <p className="agend-nome">{agend.paciente}</p>
                            <button className="agend-cancelar-btn" onClick={e => abrirModalCancelar(agend, e)}>
                              <Icon icon="solar:close-circle-linear" width="14" />
                            </button>
                          </div>
                          <p className="agend-prob">{agend.problema}</p>
                        </div>
                      ) : isHovered ? (
                        <div className="celula-hover-hint">
                          <Icon icon="solar:add-circle-linear" width="16" color="#37A6BA" />
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── VISUALIZAÇÃO MÊS ── */}
      {visualizacao === 'Mês' && (
        <div className="calendario-wrap">
          <div className="cal-mes-header">
            {DIAS_SEMANA.map(d => (
              <div key={d} className="cal-mes-dia-nome">{d}</div>
            ))}
          </div>
          <div className="cal-mes-body">
            {diasMes.map((d, i) => {
              const agendsDia = getAgendsDia(d);
              return (
                <div
                  key={i}
                  className={`cal-mes-celula ${d && ehHoje(d) ? 'celula-hoje' : ''} ${!d ? 'cal-mes-vazio' : ''}`}
                  onClick={() => d && abrirModal(d, '')}
                >
                  {d && (
                    <>
                      <span className={`cal-mes-numero ${ehHoje(d) ? 'cal-mes-numero--hoje' : ''}`}>
                        {d.getDate()}
                      </span>
                      <div className="cal-mes-agends">
                        {agendsDia.slice(0, 2).map(a => (
                          <div key={a.id} className="agend-mes-pill">
                            <span>{a.horario} {a.paciente}</span>
                            <button onClick={e => abrirModalCancelar(a, e)}>
                              <Icon icon="solar:close-circle-linear" width="11" />
                            </button>
                          </div>
                        ))}
                        {agendsDia.length > 2 && (
                          <span className="agend-mes-mais">+{agendsDia.length - 2} mais</span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}


      {modal && (
        <div className="modal-overlay" onClick={() => setModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Novo agendamento</h3>
              <button className="modal-fechar" onClick={() => setModal(false)}>
                <Icon icon="solar:close-circle-linear" width="22" />
              </button>
            </div>
            <form onSubmit={salvarAgendamento} className="modal-form">
              <div className="modal-field">
                <label>Paciente</label>
                <select value={form.patient_id} onChange={e => setForm(f => ({ ...f, patient_id: e.target.value }))} required>
                  <option value="">Selecione um paciente</option>
                  {pacientes.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div className="modal-field">
                <label>Problema / Motivo</label>
                <textarea placeholder="Ex: Dor lombar" rows={3} value={form.problema}
                  onChange={e => setForm(f => ({ ...f, problema: e.target.value }))} required />
              </div>
              <div className="modal-row">
                <div className="modal-field">
                  <label>Data</label>
                  <input type="date" value={form.data} onChange={e => setForm(f => ({ ...f, data: e.target.value }))} required />
                </div>
                <div className="modal-field">
                  <label>Horário</label>
                  <input type="time" value={form.horario} onChange={e => setForm(f => ({ ...f, horario: e.target.value }))} />
                </div>
              </div>
              {erroForm && <p className="modal-erro">{erroForm}</p>}
              <div className="modal-footer">
                <button type="button" className="btn-cancelar" onClick={() => setModal(false)}>Cancelar</button>
                <button type="submit" className="btn-salvar" disabled={loadingForm}>
                  {loadingForm ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalCancelar && agendSelecionado && (
        <div className="modal-overlay" onClick={() => setModalCancelar(false)}>
          <div className="modal-box modal-box--sm" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Cancelar agendamento?</h3>
              <button className="modal-fechar" onClick={() => setModalCancelar(false)}>
                <Icon icon="solar:close-circle-linear" width="22" />
              </button>
            </div>
            <p className="modal-cancelar-texto">
              Deseja cancelar o agendamento de <strong>{agendSelecionado.paciente}</strong> às{' '}
              <strong>{agendSelecionado.horario}</strong> do dia{' '}
              <strong>{new Date(agendSelecionado.data + 'T00:00').toLocaleDateString('pt-BR')}</strong>?
            </p>
            <div className="modal-footer" style={{ marginTop: 24 }}>
              <button className="btn-cancelar" onClick={() => setModalCancelar(false)}>Voltar</button>
              <button className="btn-excluir" onClick={confirmarCancelar}>Cancelar consulta</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}