import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import api from '../../services/api';
import './Prontuario.css';

const ABAS = ['Prontuário', 'Plano de exercício', 'Atividade'];

const formatarCPF = (cpf) => {
  if (!cpf) return '000.000.000-00';
  cpf = cpf.replace(/\D/g, '');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  return cpf;
};

const SERIES_OPTIONS = ['1','2','3','4','5','6'];
const REPS_OPTIONS   = ['5','8','10','12','15','20','25','30'];
const REST_OPTIONS   = ['15s','30s','45s','60s','90s','120s','180s'];

function emptyExercise(id) {
  return { id, exerciseId: '', title: '', series: '', reps: '', rest: '', notes: '' };
}

function ThumbPlaceholder() {
  return (
    <div className="plano-thumb-placeholder">
      <Icon icon="solar:camera-linear" width="22" color="#9FE1CB" />
    </div>
  );
}

function ExerciseRow({ exercise, index, total, catalogOptions, onChange, onRemove }) {
  const exercicioAtual = catalogOptions.find(ex => ex.id === exercise.exerciseId);

  return (
    <div className="plano-exercise-block">
      <div className="plano-exercise-block-header">
        <label className="plano-field-label">
          Exercício {index + 1}<span className="plano-required">*</span>
        </label>
        {total > 1 && (
          <button
            className="plano-remove-btn"
            onClick={() => onRemove(exercise.id)}
            title="Remover exercício"
          >
            <Icon icon="solar:close-circle-linear" width="16" />
          </button>
        )}
      </div>

      <div className="plano-exercise-selector">
        <div className="plano-exercise-thumb">
          {exercicioAtual?.image_url ? (
            <img
              src={exercicioAtual.image_url}
              alt={exercicioAtual.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
            />
          ) : (
            <ThumbPlaceholder />
          )}
        </div>
        <select
          className="plano-exercise-select"
          value={exercise.exerciseId}
          onChange={e => {
            const opt = e.target.options[e.target.selectedIndex];
            onChange(exercise.id, { exerciseId: e.target.value, title: opt.text });
          }}
        >
          <option value="">Título do exercício</option>
          {catalogOptions.map(ex => (
            <option key={ex.id} value={ex.id}>{ex.name}</option>
          ))}
        </select>
        <Icon icon="solar:alt-arrow-down-linear" width="16" className="plano-select-arrow" />
      </div>

      <div className="plano-params-row">
        {[
          { label: 'Séries', field: 'series', options: SERIES_OPTIONS },
          { label: 'Repetições', field: 'reps', options: REPS_OPTIONS },
          { label: 'Descanso', field: 'rest', options: REST_OPTIONS },
        ].map(({ label, field, options }) => (
          <div key={field} className="plano-param-group">
            <label className="plano-param-label">
              {label}<span className="plano-required">*</span>
            </label>
            <select
              className="plano-param-select"
              value={exercise[field]}
              onChange={e => onChange(exercise.id, { [field]: e.target.value })}
            >
              <option value=""></option>
              {options.map(v => <option key={v}>{v}</option>)}
            </select>
          </div>
        ))}
        <div className="plano-param-group plano-param-group--wide">
          <label className="plano-param-label">Orientações ao Paciente</label>
          <textarea
            className="plano-notes-input"
            placeholder="Digite aqui..."
            value={exercise.notes}
            onChange={e => onChange(exercise.id, { notes: e.target.value })}
            rows={2}
          />
        </div>
      </div>
    </div>
  );
}

function PlanView({ plan, catalog, onEdit, onDelete, onNewPlan }) {
  return (
    <div className="plano-view-wrapper">
      <div className="plano-card">
        <div className="plano-card-header">
          <span className="plano-ativo-label">Plano ativo</span>
          <div className="plano-card-actions">
            <button className="plano-icon-btn" onClick={onEdit} title="Editar plano">
              <Icon icon="solar:pen-linear" width="16" />
            </button>
            <button className="plano-icon-btn plano-icon-btn--danger" onClick={onDelete} title="Excluir plano">
              <Icon icon="solar:trash-bin-trash-linear" width="16" />
            </button>
          </div>
        </div>

        <div className="plano-exercise-list">
          {plan.exercises.map((ex, i) => {
            const info = catalog.find(c => c.id === ex.exerciseId);
            return (
              <div key={ex.id} className="plano-exercise-item">
                <div className="plano-exercise-item-thumb">
                  {info?.image_url ? (
                    <img
                      src={info.image_url}
                      alt={info.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                    />
                  ) : (
                    <ThumbPlaceholder />
                  )}
                </div>
                <div className="plano-exercise-item-info">
                  <p className="plano-exercise-item-name">{ex.title || `Exercício ${i + 1}`}</p>
                  <p className="plano-exercise-item-desc">{ex.notes || 'Orientação...'}</p>
                </div>
                <div className="plano-exercise-item-stats">
                  {[
                    { label: 'Séries',     value: ex.series || '0' },
                    { label: 'Repetições', value: ex.reps   || '0' },
                    { label: 'Descanso',   value: ex.rest   || '0s' },
                  ].map(({ label, value }) => (
                    <div key={label} className="plano-stat-badge">
                      <span className="plano-stat-label">{label}</span>
                      <span className="plano-stat-value">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="plano-new-row">
        <button className="pront-btn-novo" onClick={onNewPlan}>
          <Icon icon="solar:add-circle-bold" width="18" />
          Novo plano
        </button>
      </div>
    </div>
  );
}

function AbaPlanoExercicio({ pacienteId }) {
  const [status, setStatus]               = useState('loading');
  const [plan, setPlan]                   = useState(null);
  const [catalog, setCatalog]             = useState([]);
  const [editExercises, setEditExercises] = useState([emptyExercise(1)]);
  const [isSaving, setIsSaving]           = useState(false);
  const [error, setError]                 = useState(null);

  useEffect(() => {
    if (!pacienteId) return;
    setStatus('loading');
    setError(null);

    Promise.all([
      api.get(`/api/patients/${pacienteId}/exercise-plan`).then(r => r.data).catch(() => null),
      api.get('/api/exercises/catalog').then(r => r.data).catch(() => []),
    ]).then(([fetchedPlan, fetchedCatalog]) => {
      setCatalog(fetchedCatalog || []);
      if (fetchedPlan && fetchedPlan.exercises?.length > 0) {
        setPlan(fetchedPlan);
        setStatus('viewing');
      } else {
        setStatus('empty');
      }
    }).catch(err => {
      console.error(err);
      setError('Erro ao carregar plano de exercício.');
      setStatus('empty');
    });
  }, [pacienteId]);

  const startCreating = () => {
    setEditExercises([emptyExercise(Date.now())]);
    setStatus('creating');
  };

  const startEditing = () => {
    setEditExercises(plan.exercises.map(ex => ({ ...ex })));
    setStatus('editing');
  };

  const handleChangeExercise = (id, fields) => {
    setEditExercises(prev => prev.map(ex => ex.id === id ? { ...ex, ...fields } : ex));
  };

  const handleAddExercise = () => {
    setEditExercises(prev => [...prev, emptyExercise(Date.now())]);
  };

  const handleRemoveExercise = (id) => {
    setEditExercises(prev => prev.filter(ex => ex.id !== id));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);
    try {
      const url    = plan?.id
        ? `/api/patients/${pacienteId}/exercise-plan/${plan.id}`
        : `/api/patients/${pacienteId}/exercise-plan`;
      const method = plan?.id ? 'put' : 'post';
      const { data: saved } = await api[method](url, { exercises: editExercises });
      setPlan(saved);
      setStatus('viewing');
    } catch (err) {
      console.error(err);
      setError('Erro ao salvar o plano. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Tem certeza que deseja excluir este plano?')) return;
    setIsSaving(true);
    try {
      await api.delete(`/api/patients/${pacienteId}/exercise-plan/${plan.id}`);
      setPlan(null);
      setStatus('empty');
    } catch (err) {
      console.error(err);
      setError('Erro ao excluir o plano.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setStatus(plan ? 'viewing' : 'empty');
    setError(null);
  };

  if (status === 'loading') {
    return <div className="pront-loading">Carregando plano...</div>;
  }

  if (status === 'empty') {
    return (
      <div className="plano-empty-wrapper">
        <div className="plano-empty-card">
          <Icon icon="solar:folder-open-linear" width="56" color="#9FE1CB" />
          <p className="pront-vazio-titulo">Plano não iniciado</p>
          <p className="pront-vazio-sub">
            Este paciente ainda não possui um plano de exercícios cadastrado
          </p>
          {error && <p className="plano-error">{error}</p>}
          <button className="pront-btn-novo" onClick={startCreating}>
            <Icon icon="solar:add-circle-bold" width="18" />
            Criar plano de exercício
          </button>
        </div>
      </div>
    );
  }

  if (status === 'viewing') {
    return (
      <div className="pront-aba-content">
        {error && <p className="plano-error">{error}</p>}
        <PlanView
          plan={plan}
          catalog={catalog}
          onEdit={startEditing}
          onDelete={handleDelete}
          onNewPlan={startCreating}
        />
      </div>
    );
  }

  return (
    <div className="pront-aba-content">
      <div className="plano-form-card">
        <h3 className="plano-form-title">Informações pessoais</h3>

        {editExercises.map((ex, i) => (
          <ExerciseRow
            key={ex.id}
            exercise={ex}
            index={i}
            total={editExercises.length}
            catalogOptions={catalog}
            onChange={handleChangeExercise}
            onRemove={handleRemoveExercise}
          />
        ))}

        <button className="plano-add-exercise-btn" onClick={handleAddExercise}>
          <Icon icon="solar:add-circle-linear" width="18" />
          Adicionar exercício
        </button>
      </div>

      {error && <p className="plano-error">{error}</p>}

      <div className="plano-form-footer">
        <div className="plano-footer-left">
          <button className="pront-btn-novo" onClick={handleSave} disabled={isSaving}>
            <Icon icon="solar:diskette-bold" width="16" />
            {isSaving ? 'Salvando...' : 'Salvar alterações'}
          </button>
          <button className="plano-cancel-btn" onClick={handleCancel} disabled={isSaving}>
            Cancelar
          </button>
        </div>
        {status === 'editing' && (
          <button className="plano-delete-btn" onClick={handleDelete} disabled={isSaving}>
            <Icon icon="solar:trash-bin-trash-linear" width="16" />
            Excluir plano
          </button>
        )}
      </div>
    </div>
  );
}

export default function Prontuario() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [aba, setAba] = useState(0);
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const buscarPaciente = async () => {
      try {
        const { data } = await api.get(`/api/patients/${id}`);
        setPaciente(data);
      } catch (err) {
        console.error(err);
        setErro('Erro ao carregar paciente');
      } finally {
        setLoading(false);
      }
    };
    buscarPaciente();
  }, [id]);

  if (loading) return <div className="pront-loading">Carregando...</div>;
  if (erro)    return <div className="pront-loading">{erro}</div>;
  if (!paciente) return <div className="pront-loading">Paciente não encontrado.</div>;

  const iniciais = paciente?.name
    ? paciente.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()
    : 'P';

  return (
    <div className="pront-page">
      <div className="pront-header">
        <div className="pront-header-left">
          <button className="pront-voltar" onClick={() => navigate('/clinica')}>
            <Icon icon="solar:arrow-left-linear" width="18" />
            Voltar para lista
          </button>
          <div className="pront-perfil">
            <div className="pront-avatar">{iniciais}</div>
            <div className="pront-info">
              <h2 className="pront-nome">{paciente.name}</h2>
              <div className="pront-meta">
                <span className="pront-cpf">
                  <Icon icon="solar:user-id-linear" width="14" />
                  {formatarCPF(paciente.cpf)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pront-abas">
        {ABAS.map((a, i) => (
          <button
            key={a}
            className={`pront-aba ${aba === i ? 'pront-aba--ativa' : ''}`}
            onClick={() => setAba(i)}
          >
            {a}
          </button>
        ))}
      </div>

      <div className="pront-conteudo">
        {aba === 0 && <AbaProntuario pacienteId={id} />}
        {aba === 1 && <AbaPlanoExercicio pacienteId={id} />}
        {aba === 2 && <AbaAtividade pacienteId={id} />}
      </div>
    </div>
  );
}

function AbaProntuario({ pacienteId }) {
  const [modal, setModal] = useState(false);
  const [registros, setRegistros] = useState([]);
  const [loadingRegistros, setLoadingRegistros] = useState(true);
  const [form, setForm] = useState({
    record_date: '',
    main_complaint: '',
    pain_level: '',
    injury_history: '',
    diagnosis: '',
    notes: ''
  });

  const buscarRegistros = async () => {
    setLoadingRegistros(true);
    try {
      const { data } = await api.get(`/api/patients/${pacienteId}/medical-records`);
      setRegistros(data || []);
    } catch (err) {
      console.error('Erro ao buscar prontuários:', err);
    } finally {
      setLoadingRegistros(false);
    }
  };

  useEffect(() => {
    if (pacienteId) buscarRegistros();
  }, [pacienteId]);

  const salvarProntuario = async (e) => {
    e.preventDefault();
    try {
      const dados = {
        record_date: form.record_date,
        main_complaint: form.main_complaint,
        pain_level: form.pain_level ? Number(form.pain_level) : null,
        injury_history: form.injury_history,
        diagnosis: form.diagnosis,
        notes: form.notes
      };
      await api.post(`/api/patients/${pacienteId}/medical-records`, dados);
      setModal(false);
      setForm({ record_date: '', main_complaint: '', pain_level: '', injury_history: '', diagnosis: '', notes: '' });
      buscarRegistros();
    } catch (err) {
      console.error('Erro ao salvar prontuário:', err);
    }
  };

  const formatarData = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('pt-BR');
  };

  return (
    <div className="pront-aba-content">
      <div className="pront-aba-toolbar">
        <button className="pront-btn-novo" onClick={() => setModal(true)}>
          <Icon icon="solar:add-circle-bold" width="18" />
          Novo prontuário
        </button>
      </div>

      {loadingRegistros ? (
        <div className="pront-loading">Carregando registros...</div>
      ) : registros.length === 0 ? (
        <div className="pront-vazio">
          <Icon icon="solar:folder-open-linear" width="56" color="#ccc" />
          <p className="pront-vazio-titulo">Sem registros clínicos</p>
          <p className="pront-vazio-sub">Nenhum prontuário encontrado</p>
        </div>
      ) : (
        <div className="pront-registros-lista">
          {registros.map((reg) => (
            <div key={reg.id} className="pront-registro-card">
              <div className="pront-registro-header">
                <span className="pront-registro-data">
                  <Icon icon="solar:calendar-linear" width="14" />
                  {formatarData(reg.record_date)}
                </span>
                {reg.pain_level && (
                  <span className="pront-registro-dor">Dor: {reg.pain_level}/10</span>
                )}
              </div>
              {reg.main_complaint && (
                <div className="pront-registro-campo">
                  <span className="pront-registro-label">Queixa principal</span>
                  <span className="pront-registro-valor">{reg.main_complaint}</span>
                </div>
              )}
              {reg.diagnosis && (
                <div className="pront-registro-campo">
                  <span className="pront-registro-label">Diagnóstico</span>
                  <span className="pront-registro-valor">{reg.diagnosis}</span>
                </div>
              )}
              {reg.injury_history && (
                <div className="pront-registro-campo">
                  <span className="pront-registro-label">Histórico de lesões</span>
                  <span className="pront-registro-valor">{reg.injury_history}</span>
                </div>
              )}
              {reg.notes && (
                <div className="pront-registro-campo">
                  <span className="pront-registro-label">Observações</span>
                  <span className="pront-registro-valor">{reg.notes}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="pac-overlay" onClick={() => setModal(false)}>
          <div className="pac-modal pac-modal--wide" onClick={(e) => e.stopPropagation()}>
            <div className="pac-modal-header">
              <h3>Novo prontuário</h3>
              <button className="pac-modal-fechar" onClick={() => setModal(false)}>
                <Icon icon="solar:close-circle-linear" width="22" />
              </button>
            </div>
            <form onSubmit={salvarProntuario} className="pac-form">
              <div className="pac-form-grid">
                <div className="pac-field">
                  <label>Data</label>
                  <input type="date" value={form.record_date} onChange={(e) => setForm({ ...form, record_date: e.target.value })} required />
                </div>
                <div className="pac-field">
                  <label>Escala de dor</label>
                  <select value={form.pain_level} onChange={(e) => setForm({ ...form, pain_level: e.target.value })}>
                    <option value="">Selecione</option>
                    {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div className="pac-field pac-field--full">
                  <label>Queixa principal</label>
                  <textarea rows={3} className="pac-textarea" value={form.main_complaint} onChange={(e) => setForm({ ...form, main_complaint: e.target.value })} />
                </div>
                <div className="pac-field pac-field--full">
                  <label>Histórico de lesões</label>
                  <textarea rows={3} className="pac-textarea" value={form.injury_history} onChange={(e) => setForm({ ...form, injury_history: e.target.value })} />
                </div>
                <div className="pac-field pac-field--full">
                  <label>Diagnóstico</label>
                  <input type="text" value={form.diagnosis} onChange={(e) => setForm({ ...form, diagnosis: e.target.value })} />
                </div>
                <div className="pac-field pac-field--full">
                  <label>Observações</label>
                  <textarea rows={4} className="pac-textarea" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                </div>
              </div>
              <div className="pac-modal-footer">
                <button type="button" className="pac-btn-cancelar" onClick={() => setModal(false)}>Cancelar</button>
                <button type="submit" className="pac-btn-salvar">
                  <Icon icon="solar:diskette-bold" width="16" />
                  Salvar prontuário
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function AbaAtividade({ pacienteId }) {
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pacienteId) return;
    const buscar = async () => {
      try {
        const { data } = await api.get(`/api/checkins/patient/${pacienteId}`);
        setCheckins(data || []);
      } catch (err) {
        console.error('Erro ao buscar atividades:', err);
      } finally {
        setLoading(false);
      }
    };
    buscar();
  }, [pacienteId]);

  const formatarData = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  if (loading) return <div className="pront-loading">Carregando atividades...</div>;

  return (
    <div className="pront-aba-content">
      {checkins.length === 0 ? (
        <div className="pront-vazio">
          <Icon icon="solar:clipboard-list-linear" width="56" color="#ccc" />
          <p className="pront-vazio-titulo">Nenhuma atividade encontrada</p>
          <p className="pront-vazio-sub">Ainda não há check-ins ou atividades registradas</p>
        </div>
      ) : (
        <div className="pront-registros-lista">
          {checkins.map((c) => (
            <div key={c.id} className="pront-registro-card">
              <div className="pront-registro-header">
                <span className="pront-registro-data">
                  <Icon icon="solar:calendar-linear" width="14" />
                  {formatarData(c.created_at)}
                </span>
                {c.pain_level && (
                  <span className="pront-registro-dor">Dor: {c.pain_level}/10</span>
                )}
              </div>
              {c.notes && (
                <div className="pront-registro-campo">
                  <span className="pront-registro-label">Observações</span>
                  <span className="pront-registro-valor">{c.notes}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}