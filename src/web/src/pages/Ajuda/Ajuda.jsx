import "./Ajuda.css";

export default function Ajuda() {

  const secoes = [
    {
      titulo: "Dashboard",
      descricao:
        " Para visualizar métricas gerais do sistema, atendimentos e informações importantes.",
      itens: [
        "Pacientes ativos",
        "Aniversariantes do mês",
        "Atendimentos agendados",
        "Visão geral do sistema"
      ]
    },
        {
      titulo: "Agenda",
      descricao:
        "Organize consultas e sessões utilizando o calendário.",
      itens: [
        "Criar agendamentos",
        "Visualizar horários",
        "Controlar atendimentos"
      ]
    },
    {
      titulo: "Clínica",
      descricao:
        "Cadastre, visualize e gerencie os pacientes da clínica.",
      itens: [
        "Adicionar pacientes",
        "Editar informações",
        "Visualizar histórico",
        "Gerenciar prontuários"
      ]
    },

    {
      titulo: "Conteúdo",
      descricao:
        "Gerencie exercícios e planos terapêuticos.",
      itens: [
        "Cadastrar exercícios",
        "Visualizar catálogo",
        "Associar plano de exercícios ao paciente"
      ]
    },
    {
      titulo: "Configurações",
      descricao:
        "Visualize informações da conta e preferências do sistema.",
      itens: [
        "Dados do perfil",
        "Preferências visuais",
        "Configurações gerais"
      ]
    }
  ];

  return (
    <div className="ajuda-page">

      <div className="ajuda-header">

        <h1 className="ajuda-title">
          Central de Ajuda
        </h1>

        <p className="ajuda-subtitle">
          Quer entender como o site funciona? Aqui estão as principais seções e funcionalidades para te guiar!
        </p>

      </div>

      <div className="ajuda-grid">

        {secoes.map((secao, index) => (

          <div
            key={index}
            className="ajuda-card"
          >

            <h2 className="ajuda-card-title">
              {secao.titulo}
            </h2>

            <p className="ajuda-card-desc">
              {secao.descricao}
            </p>

            <ul className="ajuda-lista">

              {secao.itens.map((item, i) => (

                <li key={i}>
                  {item}
                </li>

              ))}

            </ul>

          </div>

        ))}

      </div>

    </div>
  );
}