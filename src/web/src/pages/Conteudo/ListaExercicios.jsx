import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import "./ListaExercicios.css";
import api from "../../services/api";
import { supabase } from "../../services/supabase";

export default function ListaExercicios({ aoClicarNovo }) {
  const [exercicios, setExercicios] = useState([]);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalExcluir, setModalExcluir] = useState(false);
  const [exercicioSelecionado, setExercicioSelecionado] = useState(null);
  const [novaImagem, setNovaImagem] = useState(null);
  const [previewImagem, setPreviewImagem] = useState(null);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    api
      .get("/api/exercises")
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
    try {
      await api.delete(`/api/exercises/${id}`);
      setExercicios((prev) => prev.filter((ex) => ex.id !== id));
    } catch (err) {
      console.error("Erro ao excluir:", err);
    }
  };

  const handleEditar = async () => {
    setSalvando(true);
    try {
      let image_url = exercicioSelecionado.image_url;

      if (novaImagem) {
        const formData = new FormData();
        formData.append("image", novaImagem);
        const { data } = await api.post("/api/exercises/upload-image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        image_url = data.url;
      }

      await api.put(`/api/exercises/${exercicioSelecionado.id}`, {
        title: exercicioSelecionado.title,
        description: exercicioSelecionado.description,
        image_url,
      });

      setExercicios((prev) =>
        prev.map((ex) =>
          ex.id === exercicioSelecionado.id
            ? { ...exercicioSelecionado, image_url }
            : ex
        )
      );

      setModalEditar(false);
      setNovaImagem(null);
      setPreviewImagem(null);
    } catch (err) {
      console.error("Erro ao editar:", err);
    } finally {
      setSalvando(false);
    }
  };

  const handleImagemSelecionada = (e) => {
    const arquivo = e.target.files[0];
    if (arquivo) {
      setNovaImagem(arquivo);
      setPreviewImagem(URL.createObjectURL(arquivo));
    }
  };

  const abrirEditar = (ex) => {
    setExercicioSelecionado({ ...ex });
    setNovaImagem(null);
    setPreviewImagem(null);
    setModalEditar(true);
  };

  return (
    <div className="lista-page">
      <div className="lista-cabecalho">
        <div>
          <h1 className="lista-cabecalho__titulo">Exercícios</h1>
          <p className="lista-cabecalho__desc">
            Gerencie os exercícios cadastrados, edite, exclua ou adicione novos
            exercícios ao plano dos pacientes.
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
            {filtrados.length} exercício{filtrados.length !== 1 ? "s" : ""}{" "}
            encontrado{filtrados.length !== 1 ? "s" : ""}
          </p>

          <div className="lista-grade">
            {filtrados.map((ex) => (
              <div key={ex.id} className="lista-card">
                <div className="lista-card__imagem-wrap">
                  {ex.image_url ? (
                    <img
                      src={ex.image_url}
                      alt={ex.title}
                      className="lista-card__imagem"
                    />
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
                    <button
                      className="lista-card__btn lista-card__btn--editar"
                      onClick={() => abrirEditar(ex)}
                    >
                      <Icon icon="mdi:pencil-outline" width={15} />
                      Editar
                    </button>

                    <button
                      className="lista-card__btn lista-card__btn--excluir"
                      onClick={() => {
                        setExercicioSelecionado(ex);
                        setModalExcluir(true);
                      }}
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

      {modalExcluir && (
        <div className="ex-modal-overlay" onClick={() => setModalExcluir(false)}>
          <div className="ex-modal" onClick={(e) => e.stopPropagation()}>
            <div className="ex-modal__icone ex-modal__icone--perigo">
              <Icon icon="mdi:trash-can-outline" width={28} />
            </div>
            <h2 className="ex-modal__titulo">Excluir exercício</h2>
            <p className="ex-modal__desc">
              Tem certeza que deseja excluir{" "}
              <strong>"{exercicioSelecionado?.title}"</strong>? Esta ação não
              pode ser desfeita.
            </p>
            <div className="ex-modal__acoes">
              <button
                className="ex-modal__btn ex-modal__btn--cancelar"
                onClick={() => setModalExcluir(false)}
              >
                Cancelar
              </button>
              <button
                className="ex-modal__btn ex-modal__btn--excluir"
                onClick={async () => {
                  await handleExcluir(exercicioSelecionado.id);
                  setModalExcluir(false);
                }}
              >
                <Icon icon="mdi:trash-can-outline" width={15} />
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {modalEditar && (
        <div className="ex-modal-overlay" onClick={() => setModalEditar(false)}>
          <div className="ex-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="ex-modal__titulo">Editar exercício</h2>

            <div className="ex-modal__campo">
              <label className="ex-modal__label">Imagem</label>
              <div className="ex-modal__imagem-wrap">
                {previewImagem || exercicioSelecionado?.image_url ? (
                  <img
                    src={previewImagem || exercicioSelecionado.image_url}
                    alt="Preview"
                    className="ex-modal__imagem-preview"
                  />
                ) : (
                  <div className="ex-modal__imagem-placeholder">
                    <Icon icon="mdi:image-outline" width={32} />
                  </div>
                )}
                <label className="ex-modal__imagem-btn">
                  <Icon icon="mdi:camera-outline" width={15} />
                  {previewImagem || exercicioSelecionado?.image_url ? "Trocar imagem" : "Adicionar imagem"}
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImagemSelecionada}
                  />
                </label>
              </div>
            </div>

            <div className="ex-modal__campo">
              <label className="ex-modal__label">Título</label>
              <input
                className="ex-modal__input"
                type="text"
                value={exercicioSelecionado?.title || ""}
                onChange={(e) =>
                  setExercicioSelecionado({
                    ...exercicioSelecionado,
                    title: e.target.value,
                  })
                }
              />
            </div>

            <div className="ex-modal__campo">
              <label className="ex-modal__label">Descrição</label>
              <textarea
                className="ex-modal__textarea"
                value={exercicioSelecionado?.description || ""}
                onChange={(e) =>
                  setExercicioSelecionado({
                    ...exercicioSelecionado,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div className="ex-modal__acoes">
              <button
                className="ex-modal__btn ex-modal__btn--cancelar"
                onClick={() => {
                  setModalEditar(false);
                  setNovaImagem(null);
                  setPreviewImagem(null);
                }}
              >
                Cancelar
              </button>
              <button
                className="ex-modal__btn ex-modal__btn--salvar"
                onClick={handleEditar}
                disabled={salvando}
              >
                <Icon icon="mdi:check" width={15} />
                {salvando ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 