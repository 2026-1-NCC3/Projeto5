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

        console.error(
          'Erro ao buscar paciente:',
          err
        );

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

        <div className="pront-proxima">

          <span className="pront-proxima-label">
            Próxima consulta
          </span>

          <span className="pront-proxima-data">
            —
          </span>

          <span className="pront-proxima-hora">
            —
          </span>

        </div>
      </div>

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

      <div className="pront-conteudo">

        {aba === 0 && (
          <AbaProntuario pacienteId={id} />
        )}

        {aba === 1 && (
          <AbaPlanoExercicio pacienteId={id} />
        )}

        {aba === 2 && (
          <AbaAtividade pacienteId={id} />
        )}

      </div>

    </div>
  );
}