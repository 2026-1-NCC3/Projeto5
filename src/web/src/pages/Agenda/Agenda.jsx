import { useState } from 'react';
import { Icon } from '@iconify/react';
import './Agenda.css';

const HORAS = ['8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'];
const DIAS_SEMANA = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];

function getSemana(dataBase) {
  const dias = [];
  const base = new Date(dataBase);
  const diaSemana = base.getDay();
  const segunda = new Date(base);
  segunda.setDate(base.getDate() - diaSemana + 1);
  for (let i = 0; i < 6; i++) {
    const d = new Date(segunda);
    d.setDate(segunda.getDate() + i);
    dias.push(d);
  }
  return dias;
}

function formatarMes(data) {
  return data.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })
    .replace(/^\w/, c => c.toUpperCase());
}

function formatarIntervalo(dias) {
  const fmt = d => d.toLocaleDateString('pt-BR');
  return `${fmt(dias[0])} - ${fmt(dias[dias.length - 1])}`;
}

const formVazio = { titulo: '', data: '', horaInicio: '', horaFim: '', paciente: '', descricao: '', cor: '#37A6BA' };
const CORES = ['#a78bfa', '#37A6BA', '#34c98a', '#f5a623', '#e05b5b'];

export default function Agenda() {
  const [hoje] = useState(new Date());
  const [dataBase, setDataBase] = useState(new Date());
  const [filtro, setFiltro] = useState('Próximos');
  const [visualizacao, setVisualizacao] = useState('Semana');
  const [agendamentos, setAgendamentos] = useState([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(formVazio);
  const [hoveredCelula, setHoveredCelula] = useState(null);

  const dias = getSemana(dataBase);

  const avancar = () => {
    const nova = new Date(dataBase);
    nova.setDate(nova.getDate() + 7);
    setDataBase(nova);
  };

  const voltar = () => {
    const nova = new Date(dataBase);
    nova.setDate(nova.getDate() - 7);
    setDataBase(nova);
  };

  const irParaHoje = () => setDataBase(new Date());
  const ehHoje = (d) => d.toDateString() === hoje.toDateString();

  const abrirModal = (dia, hora) => {
    const dataStr = dia ? dia.toLocaleDateString('pt-BR') : '';
    setForm({ ...formVazio, horario: hora || '', data: dataStr });
    setModal(true);
  };

  const salvarAgendamento = (e) => {
    e.preventDefault();
    if (!form.paciente || !form.problema) return;
    setAgendamentos(prev => [...prev, { ...form, id: Date.now() }]);
    setModal(false);
    setForm(formVazio);
  };

  const getAgendamento = (dia, hora) => {
    const dataStr = dia.toLocaleDateString('pt-BR');
    return agendamentos.find(a => a.data === dataStr && a.horario === hora);
  };

  return (
    <div className="agenda-container">
      {/* Header */}
      <div className="agenda-header">
        <h2 className="agenda-titulo">Agendamentos</h2>
        <div className="agenda-acoes">
          <div className="filtros-tabs">
            {['Próximos', 'Pendentes', 'Cancelados'].map(f => (
              <button key={f} className={`tab ${filtro === f ? 'tab-ativa' : ''}`} onClick={() => setFiltro(f)}>
                {f}
              </button>
            ))}
          </div>
          <div className="agenda-toolbar">
            <div className="pesquisa">
              <Icon icon="solar:magnifer-linear" width="16" />
              <input placeholder="Pesquisar" />
            </div>
            <button className="btn-filtro">
              <Icon icon="solar:filter-linear" width="16" />
              Filtro
            </button>
            <button className="btn-icone">
              <Icon icon="solar:share-circle-linear" width="18" />
            </button>
            <button className="btn-novo" onClick={() => abrirModal(null, null)}>
              <Icon icon="solar:add-circle-bold" width="18" />
              Novo
            </button>
          </div>
        </div>
      </div>

      {/* Navegação */}
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
          <span className="intervalo">{formatarIntervalo(dias)}</span>
        </div>
      </div>

      {/* Grade */}
      <div className="calendario-wrap">
        <div className="cal-header">
          <div className="cal-setas">
            <button className="seta-btn" onClick={voltar}>
              <Icon icon="solar:alt-arrow-left-linear" width="16" />
            </button>
            <button className="seta-btn" onClick={avancar}>
              <Icon icon="solar:alt-arrow-right-linear" width="16" />
            </button>
          </div>
          {dias.map((d, i) => (
            <div key={i} className={`cal-dia-header ${ehHoje(d) ? 'hoje' : ''}`}>
              <span className="dia-nome">{DIAS_SEMANA[d.getDay()].toUpperCase()} {d.getDate()}</span>
            </div>
          ))}
        </div>

        <div className="cal-body">
          {HORAS.map(hora => (
            <div key={hora} className="cal-linha">
              <div className="cal-hora">{hora}</div>
              {dias.map((d, i) => {
                const agend = getAgendamento(d, hora);
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
                        <p className="agend-nome">{agend.paciente}</p>
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

      {/* Modal */}
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
                <input
                  type="text"
                  placeholder="Nome do paciente"
                  value={form.paciente}
                  onChange={e => setForm(f => ({ ...f, paciente: e.target.value }))}
                  required
                />
              </div>

              <div className="modal-field">
                <label>Problema / Motivo</label>
                <textarea
                  placeholder="Ex: Dor lombar, reabilitação pós-cirurgia..."
                  rows={3}
                  value={form.problema}
                  onChange={e => setForm(f => ({ ...f, problema: e.target.value }))}
                  required
                />
              </div>

              <div className="modal-row">
                <div className="modal-field">
                  <label>Data</label>
                  <input
                    type="text"
                    placeholder="dd/mm/aaaa"
                    value={form.data}
                    onChange={e => setForm(f => ({ ...f, data: e.target.value }))}
                  />
                </div>
                <div className="modal-field">
                  <label>Horário</label>
                  <input
                    type="text"
                    placeholder="Ex: 9:00"
                    value={form.horario}
                    onChange={e => setForm(f => ({ ...f, horario: e.target.value }))}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-cancelar" onClick={() => setModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-salvar">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}