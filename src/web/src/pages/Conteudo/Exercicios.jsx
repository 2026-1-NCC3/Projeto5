import { useState, useRef, useCallback } from "react";
import "./Exercicios.css";
import api from "../../services/api";
import { supabase } from "../../services/supabase";

const UploadIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polyline points="16 16 12 12 8 16" />
    <line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
  </svg>
);

const ImageIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

export default function Exercicios({ aoVoltar }) {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [salvo, setSalvo] = useState(false);
  const [erros, setErros] = useState({});

  const ZonaUpload = ({ preview, aoEnviarArquivo, aoRemover }) => {
    const inputRef = useRef(null);
    const [arrastando, setArrastando] = useState(false);

    const handleDrop = useCallback((e) => {
      e.preventDefault();
      setArrastando(false);
      const arquivo = e.dataTransfer.files[0];
      if (arquivo && arquivo.type.startsWith("image/")) aoEnviarArquivo(arquivo);
    }, [aoEnviarArquivo]);

    const handleChange = (e) => {
      const arquivo = e.target.files[0];
      if (arquivo) aoEnviarArquivo(arquivo);
    };

    if (preview) {
      return (
        <div className="ex-upload ex-upload--preview">
          <img src={preview} alt="Preview do exercício" className="ex-upload__preview-img" />
          <div className="ex-upload__preview-overlay">
            <button className="ex-upload__remove-btn" type="button" onClick={aoRemover}>
              <TrashIcon /> Remover imagem
            </button>
            <button className="ex-upload__change-btn" type="button" onClick={() => inputRef.current?.click()}>
              <ImageIcon /> Trocar imagem
            </button>
          </div>
          <input ref={inputRef} type="file" accept="image/*" className="ex-upload__input" onChange={handleChange} />
        </div>
      );
    }

    return (
      <div
        className={`ex-upload${arrastando ? " ex-upload--dragging" : ""}`}
        onDragOver={(e) => { e.preventDefault(); setArrastando(true); }}
        onDragLeave={() => setArrastando(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
      >
        <input ref={inputRef} type="file" accept="image/*" className="ex-upload__input" onChange={handleChange} />
        <div className="ex-upload__icon"><UploadIcon /></div>
        <p className="ex-upload__title">Arraste a imagem aqui</p>
        <p className="ex-upload__sub">ou clique para selecionar</p>
        <button className="ex-upload__btn" type="button" onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}>
          Selecionar Arquivo
        </button>
        <p className="ex-upload__hint">PNG, JPG ou GIF · Máx 10MB</p>
      </div>
    );
  };

  const handleArquivo = (arquivo) => {
    setImageFile(arquivo);
    setImagePreview(URL.createObjectURL(arquivo));
    setErros(e => ({ ...e, imagem: null }));
  };

  const handleRemoverImagem = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const validar = () => {
    const e = {};
    if (!titulo.trim()) e.titulo = "O título é obrigatório";
    if (!descricao.trim()) e.descricao = "A descrição é obrigatória";
    setErros(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validar()) return;

    setSalvando(true);
    try {
      let image_url = null;

      if (imageFile) {
        const ext = imageFile.name.split(".").pop();
        const fileName = `${Date.now()}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("exercises")
          .upload(fileName, imageFile, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("exercises")
          .getPublicUrl(fileName);

        image_url = urlData.publicUrl;
      }

      await api.post("/api/exercises", {
        title: titulo,
        description: descricao,
        image_url,
      });

      setSalvando(false);
      setSalvo(true);
      handleLimpar();
      setTimeout(() => setSalvo(false), 3000);
    } catch (err) {
      console.error("Erro ao salvar exercício:", err);
      setSalvando(false);
    }
  };

  const handleLimpar = () => {
    setImageFile(null);
    setImagePreview(null);
    setTitulo("");
    setDescricao("");
    setErros({});
  };

  return (
    <div className="ex-page">
      <div className="ex-container">

        {aoVoltar && (
          <button className="ex-btn-voltar" onClick={aoVoltar}>
            <ArrowLeftIcon /> Voltar para lista
          </button>
        )}

        <div className="ex-header">
          <div className="ex-header__text">
            <h1 className="ex-header__title">Novo Exercício</h1>
            <p className="ex-header__desc">
              Crie um exercício para adicionar ao plano, faça upload da imagem da execução
              e o descreva para que seus pacientes realizem da forma correta.
            </p>
          </div>
        </div>

        <form className="ex-form" onSubmit={handleSubmit} noValidate>
          <div className="ex-field">
            <label className="ex-label">Faça upload da imagem do exercício:</label>
            <ZonaUpload preview={imagePreview} aoEnviarArquivo={handleArquivo} aoRemover={handleRemoverImagem} />
            {erros.imagem && <span className="ex-error">{erros.imagem}</span>}
          </div>

          <div className="ex-divider" />

          <div className="ex-field">
            <label className="ex-label" htmlFor="titulo">
              Título: <span className="ex-label__required">*</span>
            </label>
            <input
              id="titulo"
              className={`ex-input${erros.titulo ? " ex-input--error" : ""}`}
              type="text"
              placeholder="Ex: Agachamento com apoio, Extensão lombar..."
              value={titulo}
              onChange={e => { setTitulo(e.target.value); setErros(v => ({ ...v, titulo: null })); }}
              maxLength={80}
            />
            <div className="ex-field__meta">
              {erros.titulo && <span className="ex-error">{erros.titulo}</span>}
              <span className="ex-char-count">{titulo.length}/80</span>
            </div>
          </div>

          <div className="ex-field">
            <label className="ex-label" htmlFor="descricao">
              Descrição: <span className="ex-label__required">*</span>
            </label>
            <textarea
              id="descricao"
              className={`ex-textarea${erros.descricao ? " ex-textarea--error" : ""}`}
              placeholder="Descreva como o exercício deve ser executado, séries, repetições, cuidados importantes..."
              value={descricao}
              onChange={e => { setDescricao(e.target.value); setErros(v => ({ ...v, descricao: null })); }}
              rows={5}
              maxLength={600}
            />
            <div className="ex-field__meta">
              {erros.descricao && <span className="ex-error">{erros.descricao}</span>}
              <span className="ex-char-count">{descricao.length}/600</span>
            </div>
          </div>

          <div className="ex-actions">
            <button type="button" className="ex-btn ex-btn--ghost" onClick={handleLimpar}>
              Limpar campos
            </button>
            <button
              type="submit"
              className={`ex-btn ex-btn--primary${salvando ? " ex-btn--loading" : ""}${salvo ? " ex-btn--saved" : ""}`}
              disabled={salvando}
            >
              {salvando ? (
                <><span className="ex-btn__spinner" /> Salvando...</>
              ) : salvo ? (
                <><CheckIcon /> Exercício salvo!</>
              ) : (
                <><SparkleIcon /> Salvar Exercício</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}