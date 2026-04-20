"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import type { ChangeEvent } from "react";
import gsap from "gsap";
import type { ProvadorSelection } from "../../types";
import {
  CLOTHING_TYPES,
  FABRICS,
  STYLES,
  COLOR_SWATCHES,
  ATELIE_WHATSAPP,
} from "../../provador-config";

const TOTAL_STEPS = 5;

const STEP_LABELS = [
  "Tipo de peça",
  "Cores",
  "Tecido & estilo",
  "Descrição",
  "Sua foto",
];

function emptySelection(): ProvadorSelection {
  return {
    clothingTypeId: "",
    primaryColor: "",
    secondaryColor: "",
    accentColor: "",
    fabricId: "",
    styleId: "",
    description: "",
    photoFile: null,
    photoPreviewUrl: "",
  };
}

export default function Provador() {
  const ref = useRef<HTMLElement>(null);
  const [step, setStep] = useState(1);
  const [sel, setSel] = useState<ProvadorSelection>(emptySelection());
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current.querySelectorAll(".animate-in"),
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.45, ease: "power3.out" }
    );
  }, [step]);

  function animateStep(next: number) {
    if (!ref.current) { setStep(next); return; }
    const content = ref.current.querySelector(".provador-step-body");
    gsap.to(content, {
      opacity: 0, x: -20, duration: 0.15, onComplete: () => {
        setStep(next);
        gsap.fromTo(content, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.25, ease: "power2.out" });
      },
    });
  }

  function canAdvance() {
    if (step === 1) return !!sel.clothingTypeId;
    if (step === 2) return !!sel.primaryColor;
    if (step === 3) return !!sel.fabricId && !!sel.styleId;
    if (step === 4) return sel.description.trim().length >= 10;
    if (step === 5) return !!sel.photoFile;
    return true;
  }

  const handlePhotoChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setSel((s) => ({ ...s, photoFile: file, photoPreviewUrl: url }));
  }, []);

  async function handleGenerate() {
    if (!sel.photoFile) return;
    setLoading(true);
    setError("");
    setResultImage("");

    const clothingType = CLOTHING_TYPES.find((c) => c.id === sel.clothingTypeId)?.label ?? sel.clothingTypeId;
    const fabric       = FABRICS.find((f) => f.id === sel.fabricId)?.label ?? sel.fabricId;
    const style        = STYLES.find((s) => s.id === sel.styleId)?.label ?? sel.styleId;
    const primaryColor = COLOR_SWATCHES.find((c) => c.id === sel.primaryColor)?.label ?? sel.primaryColor;
    const secondaryColor = COLOR_SWATCHES.find((c) => c.id === sel.secondaryColor)?.label ?? "";
    const accentColor  = COLOR_SWATCHES.find((c) => c.id === sel.accentColor)?.label ?? "";

    const fd = new FormData();
    fd.append("photo", sel.photoFile);
    fd.append("clothingType", clothingType);
    fd.append("fabric", fabric);
    fd.append("style", style);
    fd.append("primaryColor", primaryColor);
    fd.append("secondaryColor", secondaryColor);
    fd.append("accentColor", accentColor);
    fd.append("description", sel.description);

    try {
      const res = await fetch("/api/provador/generate", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erro desconhecido.");
      setResultImage(data.image);
      animateStep(6);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Falha ao gerar imagem.");
    } finally {
      setLoading(false);
    }
  }

  function handleSendWpp() {
    const clothingType = CLOTHING_TYPES.find((c) => c.id === sel.clothingTypeId)?.label;
    const fabric       = FABRICS.find((f) => f.id === sel.fabricId)?.label;
    const style        = STYLES.find((s) => s.id === sel.styleId)?.label;
    const primary      = COLOR_SWATCHES.find((c) => c.id === sel.primaryColor)?.label;

    const msg = encodeURIComponent(
      `Olá! Gerei uma visualização de roupa pelo Provador Inteligente do Ateliê Luz das Almas.\n\n` +
      `*Tipo:* ${clothingType}\n*Tecido:* ${fabric}\n*Estilo:* ${style}\n*Cor principal:* ${primary}\n` +
      `*Descrição:* ${sel.description}\n\n` +
      `Gostei do resultado e gostaria de negociar a confecção! 💛`
    );
    window.open(`https://wa.me/${ATELIE_WHATSAPP}?text=${msg}`, "_blank", "noopener");
  }

  function reset() {
    setSel(emptySelection());
    setResultImage("");
    setError("");
    animateStep(1);
  }

  const progressPct = step <= TOTAL_STEPS ? ((step - 1) / TOTAL_STEPS) * 100 : 100;

  return (
    <section className="section-container" id="provador" ref={ref}>
      <div className="section-header animate-in">
        <h2 className="section-title">Provador inteligente</h2>
        <p className="section-sub">
          Descreva como quer sua peça, envie sua foto e veja como ficaria em você — antes de encomendar.
        </p>
      </div>

      <div className="provador-wizard animate-in">
        {/* Progress */}
        {step <= TOTAL_STEPS && (
          <div className="wizard-progress">
            <div className="wizard-progress-bar">
              <div className="wizard-progress-fill" style={{ width: `${progressPct}%` }} />
            </div>
            <div className="wizard-steps-labels">
              {STEP_LABELS.map((label, i) => (
                <span
                  key={label}
                  className={`wizard-step-dot${step === i + 1 ? " active" : ""}${step > i + 1 ? " done" : ""}`}
                >
                  <span className="dot-num">{step > i + 1 ? "✓" : i + 1}</span>
                  <span className="dot-label">{label}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="provador-step-body">
          {/* ── STEP 1: Tipo de peça ── */}
          {step === 1 && (
            <div className="wizard-section">
              <h3 className="wizard-section-title">Que tipo de peça você quer?</h3>
              <div className="clothing-type-grid">
                {CLOTHING_TYPES.map((type) => (
                  <button
                    key={type.id}
                    className={`clothing-type-card${sel.clothingTypeId === type.id ? " selected" : ""}`}
                    onClick={() => setSel((s) => ({ ...s, clothingTypeId: type.id }))}
                  >
                    <span className="clothing-type-label">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── STEP 2: Cores ── */}
          {step === 2 && (
            <div className="wizard-section">
              <h3 className="wizard-section-title">Escolha as cores</h3>

              <div className="color-group">
                <label className="color-group-label">Cor principal <span className="required">*</span></label>
                <div className="color-swatches">
                  {COLOR_SWATCHES.filter((c) => c.id !== "none").map((c) => (
                    <button
                      key={c.id}
                      title={c.label}
                      aria-label={c.label}
                      className={`color-swatch${sel.primaryColor === c.id ? " selected" : ""}`}
                      style={{ background: c.hex }}
                      onClick={() => setSel((s) => ({ ...s, primaryColor: c.id }))}
                    />
                  ))}
                </div>
              </div>

              <div className="color-group">
                <label className="color-group-label">Cor secundária <span className="optional">(opcional)</span></label>
                <div className="color-swatches">
                  {COLOR_SWATCHES.map((c) => (
                    <button
                      key={c.id}
                      title={c.label}
                      aria-label={c.label}
                      className={`color-swatch${c.id === "none" ? " swatch-none" : ""}${sel.secondaryColor === c.id ? " selected" : ""}`}
                      style={{ background: c.id === "none" ? undefined : c.hex }}
                      onClick={() => setSel((s) => ({ ...s, secondaryColor: c.id === "none" ? "" : c.id }))}
                    />
                  ))}
                </div>
              </div>

              <div className="color-group">
                <label className="color-group-label">Cor de detalhe / bordado <span className="optional">(opcional)</span></label>
                <div className="color-swatches">
                  {COLOR_SWATCHES.map((c) => (
                    <button
                      key={c.id}
                      title={c.label}
                      aria-label={c.label}
                      className={`color-swatch${c.id === "none" ? " swatch-none" : ""}${sel.accentColor === c.id ? " selected" : ""}`}
                      style={{ background: c.id === "none" ? undefined : c.hex }}
                      onClick={() => setSel((s) => ({ ...s, accentColor: c.id === "none" ? "" : c.id }))}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 3: Tecido & Estilo ── */}
          {step === 3 && (
            <div className="wizard-section">
              <h3 className="wizard-section-title">Tecido e estilo</h3>

              <div className="option-group">
                <label className="color-group-label">Tecido <span className="required">*</span></label>
                <div className="option-chips">
                  {FABRICS.map((f) => (
                    <button
                      key={f.id}
                      className={`option-chip${sel.fabricId === f.id ? " selected" : ""}`}
                      onClick={() => setSel((s) => ({ ...s, fabricId: f.id }))}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="option-group">
                <label className="color-group-label">Estilo <span className="required">*</span></label>
                <div className="option-chips">
                  {STYLES.map((st) => (
                    <button
                      key={st.id}
                      className={`option-chip${sel.styleId === st.id ? " selected" : ""}`}
                      onClick={() => setSel((s) => ({ ...s, styleId: st.id }))}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 4: Descrição ── */}
          {step === 4 && (
            <div className="wizard-section">
              <h3 className="wizard-section-title">Descreva sua peça</h3>
              <p className="wizard-hint">
                Quanto mais detalhe, melhor o resultado. Mencione comprimento, decote, bordados, estampas, referências espirituais, etc.
              </p>
              <textarea
                className="filter-input provador-textarea"
                rows={6}
                placeholder="Ex: Quero uma saia longa com bordados dourados na barra, inspirada nos orixás, com fenda lateral e recortes em renda..."
                value={sel.description}
                onChange={(e) => setSel((s) => ({ ...s, description: e.target.value }))}
              />
              <span className={`char-count${sel.description.length < 10 ? " warn" : ""}`}>
                {sel.description.length} caracteres {sel.description.length < 10 ? "(mínimo 10)" : "✓"}
              </span>
            </div>
          )}

          {/* ── STEP 5: Foto ── */}
          {step === 5 && (
            <div className="wizard-section">
              <h3 className="wizard-section-title">Envie sua foto</h3>
              <p className="wizard-hint">
                Use uma foto em pé, com o corpo inteiro visível, em fundo claro. Quanto melhor a foto, melhor o resultado da IA.
              </p>
              <label className="photo-upload-label">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="photo-upload-input"
                  onChange={handlePhotoChange}
                />
                {sel.photoPreviewUrl ? (
                  <img src={sel.photoPreviewUrl} alt="Preview" className="photo-preview" />
                ) : (
                  <div className="photo-upload-placeholder">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <span>Clique para escolher sua foto</span>
                    <small>JPG, PNG ou WEBP · máx. 10 MB</small>
                  </div>
                )}
              </label>
              <p className="privacy-note">
                🔒 Sua foto é processada apenas para gerar a visualização e não é armazenada em nossos servidores.
              </p>
            </div>
          )}

          {/* ── GENERATING ── */}
          {loading && (
            <div className="provador-generating">
              <div className="generating-spinner" />
              <p>A IA está criando sua peça...</p>
              <small>Pode levar até 30 segundos</small>
            </div>
          )}

          {/* ── ERROR ── */}
          {error && (
            <div className="provador-error">
              <p>⚠️ {error}</p>
              <button className="btn-wpp" onClick={() => { setError(""); setLoading(false); }}>
                Tentar novamente
              </button>
            </div>
          )}

          {/* ── STEP 6: Resultado ── */}
          {step === 6 && resultImage && (
            <div className="wizard-section">
              <h3 className="wizard-section-title">Sua visualização está pronta! ✨</h3>
              <p className="wizard-hint">
                Este é um preview gerado por IA. A peça real será confeccionada com materiais do ateliê. Se gostar, envie para o WhatsApp para negociarmos!
              </p>
              <div className="result-grid">
                <div className="result-col">
                  <span className="result-label">Sua foto original</span>
                  <img src={sel.photoPreviewUrl} alt="Foto original" className="result-image" />
                </div>
                <div className="result-col">
                  <span className="result-label">Com a peça idealizada</span>
                  <img src={resultImage} alt="Geração IA" className="result-image" />
                </div>
              </div>
              <div className="result-actions">
                <button className="btn-wpp" onClick={handleSendWpp}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.272-.099-.47-.148-.668.15-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.372-.025-.52-.075-.149-.668-1.611-.916-2.206-.242-.579-.487-.5-.668-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.793.372-.272.298-1.04 1.016-1.04 2.479 0 1.463 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.528 5.852L.057 23.571a.5.5 0 0 0 .614.614l5.719-1.471A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.956 9.956 0 0 1-5.127-1.414l-.366-.22-3.795.977.997-3.794-.24-.38A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                  </svg>
                  Enviar para o Ateliê via WhatsApp
                </button>
                <button className="option-chip" onClick={reset}>
                  Criar outra visualização
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Navigation buttons ── */}
        {step <= TOTAL_STEPS && !loading && (
          <div className="wizard-nav">
            {step > 1 && (
              <button className="option-chip" onClick={() => animateStep(step - 1)}>
                ← Voltar
              </button>
            )}
            {step < TOTAL_STEPS && (
              <button
                className="btn-wpp"
                disabled={!canAdvance()}
                onClick={() => animateStep(step + 1)}
              >
                Próximo →
              </button>
            )}
            {step === TOTAL_STEPS && (
              <button
                className="btn-wpp"
                disabled={!canAdvance() || loading}
                onClick={handleGenerate}
              >
                Gerar visualização ✨
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}


