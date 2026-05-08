import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import api from '../../services/api';
import './Prontuario.css';

const ABAS = [
  'Prontuário',
  'Plano de exercício',
  'Atividade'
];

const formatarCPF = (cpf) => {
  if (!cpf) return '000.000.000-00';

  cpf = cpf.replace(/\D/g, '');

  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

  return cpf;
};

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

        const { data } = await api.get(
          `/api/patients/${id}`
        );

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

  if (loading) {
    return (
      <div className="pront-loading">
        Carregando...
      </div>
    );
  }

  if (erro) {
    return (
      <div className="pront-loading">
        {erro}
      </div>
    );
  }

  if (!paciente) {
    return (
      <div className="pront-loading">
        Paciente não encontrado.
      </div>
    );
  }

  const iniciais = paciente?.name
    ? paciente.name
        .split(' ')
        .map(n => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'P';

  return (

    <div className="pront-page">

      {/* HEADER */}
      <div className="pront-header">

        <div className="pront-header-left">

          <button
            className="pront-voltar"
            onClick={() => navigate('/clinica')}
          >
            <Icon
              icon="solar:arrow-left-linear"
              width="18"
            />

            Voltar para lista
          </button>

          <div className="pront-perfil">

            <div className="pront-avatar">
              {iniciais}
            </div>

            <div className="pront-info">

              <h2 className="pront-nome">
                {paciente.name}
              </h2>

              <div className="pront-meta">

                <span className="pront-cpf">

                  <Icon
                    icon="solar:user-id-linear"
                    width="14"
                  />

                  {formatarCPF(paciente.cpf)}

                </span>

              </div>

            </div>
          </div>

        </div>

      </div>

      {/* ABAS */}
      <div className="pront-abas">

        {ABAS.map((a, i) => (

          <button
            key={a}
            className={`pront-aba ${
              aba === i
                ? 'pront-aba--ativa'
                : ''
            }`}
            onClick={() => setAba(i)}
          >
            {a}
          </button>

        ))}

      </div>

      {/* CONTEÚDO */}
      <div className="pront-conteudo">

        {aba === 0 && (
          <AbaProntuario pacienteId={id} />
        )}

        {aba === 1 && (
          <AbaPlanoExercicio />
        )}

        {aba === 2 && (
          <AbaAtividade />
        )}

      </div>

    </div>
  );
}

function AbaProntuario({ pacienteId }) {

  const [modal, setModal] = useState(false);

  const [form, setForm] = useState({
    record_date: '',
    main_complaint: '',
    pain_level: '',
    injury_history: '',
    diagnosis: '',
    notes: ''
  });

  const salvarProntuario = async (e) => {

    e.preventDefault();

    try {

      await api.post(
        `/api/patients/${pacienteId}/medical-records`,
        form
      );

      setModal(false);

      setForm({
        record_date: '',
        main_complaint: '',
        pain_level: '',
        injury_history: '',
        diagnosis: '',
        notes: ''
      });

    } catch (err) {

      console.error(
        'Erro ao salvar prontuário:',
        err
      );
    }
  };

  return (
    <div className="pront-aba-content">

      <div className="pront-aba-toolbar">

        <button
          className="pront-btn-novo"
          onClick={() => setModal(true)}
        >
          <Icon
            icon="solar:add-circle-bold"
            width="18"
          />

          Novo prontuário
        </button>

      </div>

      <div className="pront-vazio">

        <Icon
          icon="solar:folder-open-linear"
          width="56"
          color="#ccc"
        />

        <p className="pront-vazio-titulo">
          Sem registros clínicos
        </p>

        <p className="pront-vazio-sub">
          Nenhum prontuário encontrado
        </p>

      </div>

      {/* MODAL */}
      {modal && (

        <div
          className="pac-overlay"
          onClick={() => setModal(false)}
        >

          <div
            className="pac-modal pac-modal--wide"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="pac-modal-header">

              <h3>
                Novo prontuário
              </h3>

              <button
                className="pac-modal-fechar"
                onClick={() => setModal(false)}
              >
                <Icon
                  icon="solar:close-circle-linear"
                  width="22"
                />
              </button>

            </div>

            <form
              onSubmit={salvarProntuario}
              className="pac-form"
            >

              <div className="pac-form-grid">

                <div className="pac-field">
                  <label>Data</label>

                  <input
                    type="date"
                    value={form.record_date}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        record_date: e.target.value
                      })
                    }
                    required
                  />
                </div>

                <div className="pac-field">
                  <label>Escala de dor</label>

                  <select
                    value={form.pain_level}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        pain_level: e.target.value
                      })
                    }
                  >
                    <option value="">
                      Selecione
                    </option>

                    {[1,2,3,4,5,6,7,8,9,10].map(n => (
                      <option
                        key={n}
                        value={n}
                      >
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pac-field pac-field--full">

                  <label>
                    Queixa principal
                  </label>

                  <textarea
                    rows={3}
                    className="pac-textarea"
                    value={form.main_complaint}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        main_complaint: e.target.value
                      })
                    }
                  />

                </div>

                <div className="pac-field pac-field--full">

                  <label>
                    Histórico de lesões
                  </label>

                  <textarea
                    rows={3}
                    className="pac-textarea"
                    value={form.injury_history}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        injury_history: e.target.value
                      })
                    }
                  />

                </div>

                <div className="pac-field pac-field--full">

                  <label>
                    Diagnóstico
                  </label>

                  <input
                    type="text"
                    value={form.diagnosis}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        diagnosis: e.target.value
                      })
                    }
                  />

                </div>

                <div className="pac-field pac-field--full">

                  <label>
                    Observações
                  </label>

                  <textarea
                    rows={4}
                    className="pac-textarea"
                    value={form.notes}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        notes: e.target.value
                      })
                    }
                  />

                </div>

              </div>

              <div className="pac-modal-footer">

                <button
                  type="button"
                  className="pac-btn-cancelar"
                  onClick={() => setModal(false)}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="pac-btn-salvar"
                >
                  <Icon
                    icon="solar:diskette-bold"
                    width="16"
                  />

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

function AbaPlanoExercicio() {
  return (
    <div className="pront-aba-content">

      <div className="pront-vazio">

        <Icon
          icon="solar:running-round-linear"
          width="56"
          color="#ccc"
        />

        <p className="pront-vazio-titulo">
          Nenhum plano encontrado
        </p>

      </div>

    </div>
  );
}

function AbaAtividade() {
  return (
    <div className="pront-aba-content">

      <div className="pront-vazio">

        <Icon
          icon="solar:clipboard-list-linear"
          width="56"
          color="#ccc"
        />

        <p className="pront-vazio-titulo">
          Nenhuma atividade encontrada
        </p>

      </div>

    </div>
  );
}