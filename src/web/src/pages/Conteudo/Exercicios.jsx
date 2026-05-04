import { useState, useRef, useCallback } from "react";
import "./Exercicios.css";

// ── Icons ──────────────────────────────────────────────────────────────────
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

const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
  </svg>
);

// ── Mock planos (substituir por fetch do Supabase) ─────────────────────────
const PLANOS_MOCK = [
  { id: 1, nome: "Plano Lombar Básico" },
  { id: 2, nome: "Reabilitação Joelho" },
  { id: 3, nome: "Fortalecimento Cervical" },
  { id: 4, nome: "Mobilidade Ombro" },
  { id: 5, nome: "RPG Postural Avançado" },
];

// ── Toggle Switch ──────────────────────────────────────────────────────────
const Toggle = ({ checked, onChange }) => (
  <button
    className={`ex-toggle${checked ? " ex-toggle--on" : ""}`}
    onClick={() => onChange(!checked)}
    type="button"
    aria-pressed={checked}
  >
    <span className="ex-toggle__thumb" />
  </button>
);

// ── Select customizado ─────────────────────────────────────────────────────
const PlanoSelect = ({ value, onChange, planos }) => {
  const [open, setOpen] = useState(false);
  const selected = planos.find(p => p.id === value);

  return (
    <div className={`ex-select${open ? " ex-select--open" : ""}`}>
      <button
        className="ex-select__trigger"
        type="button"
        onClick={() => setOpen(o => !o)}
      >
        <span className={selected ? "ex-select__value" : "ex-select__placeholder"}>
          {selected ? selected.nome : "Selecione um plano..."}
        </span>
        <ChevronIcon />
      </button>
      {open && (
        <div className="ex-select__dropdown">
          {planos.map(p => (
            <button
              key={p.id}
              className={`ex-select__option${value === p.id ? " ex-select__option--selected" : ""}`}
              type="button"
              onClick={() => { onChange(p.id); setOpen(false); }}
            >
              <span>{p.nome}</span>
              {value === p.id && <CheckIcon />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Upload Zone ────────────────────────────────────────────────────────────
const UploadZone = ({ preview, onFile, onRemove }) => {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) onFile(file);
  }, [onFile]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) onFile(file);
  };

  if (preview) {
    return (
      <div className="ex-upload ex-upload--preview">
        <img src={preview} alt="Preview do exercício" className="ex-upload__preview-img" />
        <div className="ex-upload__preview-overlay">
          <button className="ex-upload__remove-btn" type="button" onClick={onRemove}>
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
      className={`ex-upload${dragging ? " ex-upload--dragging" : ""}`}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
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

// ── Main Component ─────────────────────────────────────────────────────────
export default function Exercicios() {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [associarPlano, setAssociarPlano] = useState(false);
  const [planoId, setPlanoId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState({});

  const handleFile = (file) => {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setErrors(e => ({ ...e, imagem: null }));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const validate = () => {
    const e = {};
    if (!imageFile) e.imagem = "Adicione uma imagem do exercício";
    if (!titulo.trim()) e.titulo = "O título é obrigatório";
    if (!descricao.trim()) e.descricao = "A descrição é obrigatória";
    if (associarPlano && !planoId) e.plano = "Selecione um plano";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    // TODO: substituir pelo insert real no Supabase
    // const { data, error } = await supabase.from('exercicios').insert({...})
    await new Promise(r => setTimeout(r, 1200));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleClear = () => {
    setImageFile(null);
    setImagePreview(null);
    setTitulo("");
    setDescricao("");
    setAssociarPlano(false);
    setPlanoId(null);
    setErrors({});
  };

  return (
    <div className="ex-page">
      <div className="ex-container">
        {/* Header */}
        <div className="ex-header">
          <div className="ex-header__text">
            <h1 className="ex-header__title">Exercícios</h1>
            <p className="ex-header__desc">
              Crie um exercício para adicionar ao plano, faça upload da imagem da execução
              e o descreva para que seus pacientes realizem da forma correta.
            </p>
          </div>
        </div>

        <form className="ex-form" onSubmit={handleSubmit} noValidate>
          {/* Upload */}
          <div className="ex-field">
            <label className="ex-label">Faça upload da imagem do exercício:</label>
            <UploadZone
              preview={imagePreview}
              onFile={handleFile}
              onRemove={handleRemoveImage}
            />
            {errors.imagem && <span className="ex-error">{errors.imagem}</span>}
          </div>

          {/* Divider */}
          <div className="ex-divider" />

          {/* Título */}
          <div className="ex-field">
            <label className="ex-label" htmlFor="titulo">
              Título: <span className="ex-label__required">*</span>
            </label>
            <input
              id="titulo"
              className={`ex-input${errors.titulo ? " ex-input--error" : ""}`}
              type="text"
              placeholder="Ex: Agachamento com apoio, Extensão lombar..."
              value={titulo}
              onChange={e => { setTitulo(e.target.value); setErrors(v => ({ ...v, titulo: null })); }}
              maxLength={80}
            />
            <div className="ex-field__meta">
              {errors.titulo && <span className="ex-error">{errors.titulo}</span>}
              <span className="ex-char-count">{titulo.length}/80</span>
            </div>
          </div>

          {/* Descrição */}
          <div className="ex-field">
            <label className="ex-label" htmlFor="descricao">
              Descrição: <span className="ex-label__required">*</span>
            </label>
            <textarea
              id="descricao"
              className={`ex-textarea${errors.descricao ? " ex-textarea--error" : ""}`}
              placeholder="Descreva como o exercício deve ser executado, séries, repetições, cuidados importantes..."
              value={descricao}
              onChange={e => { setDescricao(e.target.value); setErrors(v => ({ ...v, descricao: null })); }}
              rows={5}
              maxLength={600}
            />
            <div className="ex-field__meta">
              {errors.descricao && <span className="ex-error">{errors.descricao}</span>}
              <span className="ex-char-count">{descricao.length}/600</span>
            </div>
          </div>

          {/* Associar a plano */}
          <div className="ex-field">
            <div className="ex-toggle-row">
              <div className="ex-toggle-row__text">
                <span className="ex-label" style={{ marginBottom: 0 }}>
                  Associar a um plano existente
                </span>
                <span className="ex-toggle-row__hint">
                  Vincule este exercício a um plano de tratamento já criado
                </span>
              </div>
              <Toggle checked={associarPlano} onChange={setAssociarPlano} />
            </div>

            {associarPlano && (
              <div className="ex-plano-select">
                <PlanoSelect
                  value={planoId}
                  onChange={(id) => { setPlanoId(id); setErrors(v => ({ ...v, plano: null })); }}
                  planos={PLANOS_MOCK}
                />
                {errors.plano && <span className="ex-error">{errors.plano}</span>}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="ex-actions">
            <button type="button" className="ex-btn ex-btn--ghost" onClick={handleClear}>
              Limpar campos
            </button>
            <button
              type="submit"
              className={`ex-btn ex-btn--primary${saving ? " ex-btn--loading" : ""}${saved ? " ex-btn--saved" : ""}`}
              disabled={saving}
            >
              {saving ? (
                <><span className="ex-btn__spinner" /> Salvando...</>
              ) : saved ? (
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