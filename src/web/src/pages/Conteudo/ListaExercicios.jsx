import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./ListaExercicios.css";
import api from "../../services/api";

export default function ListaExercicios({ aoClicarNovo }) {
  const [exercicios, setExercicios] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
  api.get("/api/exercises")
    .then(({ data }) => {
      if (Array.isArray(data)) {
        setExercicios(data);
      } else {
        setExercicios([]);
      }
    })
    .catch((err) => {
      console.error("Erro ao buscar exercícios:", err);
      setExercicios([]);
    })
    .finally(() => setCarregando(false));
}, []);

  const filtrados = exercicios.filter((ex) =>
    ex.title.toLowerCase().includes(busca.toLowerCase())
  );

  const handleExcluir = async (id) => {
    if (!confirm("Excluir este exercício?")) return;
    try {
      await api.delete(`/api/exercises/${id}`);
      setExercicios((prev) => prev.filter((ex) => ex.id !== id));
    } catch (err) {
      console.error("Erro ao excluir:", err);
    }
  };

  return (
    <div className="lista-page">
      <div className="lista-cabecalho">
        <div>
          <h1 className="lista-cabecalho__titulo">Exercícios</h1>
          <p className="lista-cabecalho__desc">
            Gerencie os exercícios cadastrados, edite, exclua ou adicione novos exercícios ao plano dos pacientes.
          </p>
        </div>
        <button className="lista-btn-novo" onClick={aoClicarNovo}>
          <Icon icon="mdi:plus" width={18} />
          Novo Exercício
        </button>
      </div>

      <div className="lista-busca">
        <Icon icon="mdi:magnify" width={18} className="lista-busca__icone" />
        <input
          type="text"
          placeholder="Pesquisar exercícios..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="lista-busca__input"
        />
      </div>

      {carregando ? (
        <div className="lista-vazio">Carregando exercícios...</div>
      ) : filtrados.length === 0 ? (
        <div className="lista-vazio">
          <Icon icon="mdi:dumbbell" width={40} />
          <p>Nenhum exercício encontrado</p>
        </div>
      ) : (
        <>
          <p className="lista-contagem">
            {filtrados.length} exercício{filtrados.length !== 1 ? "s" : ""} encontrado{filtrados.length !== 1 ? "s" : ""}
          </p>
          <div className="lista-grade">
            {filtrados.map((ex) => (
              <div key={ex.id} className="lista-card">
                <div className="lista-card__imagem-wrap">
                  {ex.image_url ? (
                    <img src={ex.image_url} alt={ex.title} className="lista-card__imagem" />
                  ) : (
                    <div className="lista-card__imagem-placeholder">
                      <Icon icon="mdi:dumbbell" width={32} />
                    </div>
                  )}
                </div>
                <div className="lista-card__corpo">
                  <h3 className="lista-card__titulo">{ex.title}</h3>
                  <p className="lista-card__descricao">{ex.description}</p>
                  <div className="lista-card__acoes">
                    <button className="lista-card__btn lista-card__btn--editar">
                      <Icon icon="mdi:pencil-outline" width={15} />
                      Editar
                    </button>
                    <button
                      className="lista-card__btn lista-card__btn--excluir"
                      onClick={() => handleExcluir(ex.id)}
                    >
                      <Icon icon="mdi:trash-can-outline" width={15} />
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}