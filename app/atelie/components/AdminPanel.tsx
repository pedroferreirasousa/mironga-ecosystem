"use client";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useAtelieStore } from "../store";
import type { ClothingItem } from "../types";

const SIZES = ["PP", "P", "M", "G", "GG", "XGG"];
const ADMIN_PASSWORD = "mironga2026"; // troque para senha forte em produção

function emptyForm() {
  return { name: "", description: "", price: "", sizes: [] as string[], whatsappNumber: "", photos: "" };
}

export default function AdminPanel() {
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const [form, setForm] = useState(emptyForm());
  const [editing, setEditing] = useState<ClothingItem | null>(null);
  const [feedback, setFeedback] = useState("");
  const { items, addItem, removeItem, updateItem } = useAtelieStore();
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!listRef.current) return;
    gsap.fromTo(
      listRef.current.querySelectorAll("li"),
      { opacity: 0, x: -16 },
      { opacity: 1, x: 0, stagger: 0.07, duration: 0.4, ease: "power3.out" }
    );
  }, [items.length]);

  function login(e: React.FormEvent) {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) { setAuth(true); setPwError(false); }
    else setPwError(true);
  }

  function toggleSize(s: string) {
    setForm((f) => ({
      ...f,
      sizes: f.sizes.includes(s) ? f.sizes.filter((x) => x !== s) : [...f.sizes, s],
    }));
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const photoArr = form.photos.split(",").map((p) => p.trim()).filter(Boolean);
    const payload = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price) || 0,
      sizes: form.sizes,
      photos: photoArr.length ? photoArr : ["/images/logo_linktree.png"],
      whatsappNumber: form.whatsappNumber,
    };
    if (editing) {
      updateItem({ ...editing, ...payload });
      setFeedback("Peça atualizada!");
    } else {
      addItem(payload);
      setFeedback("Peça adicionada!");
    }
    setForm(emptyForm());
    setEditing(null);
    setTimeout(() => setFeedback(""), 3000);
  }

  function startEdit(item: ClothingItem) {
    setEditing(item);
    setForm({
      name: item.name,
      description: item.description,
      price: String(item.price),
      sizes: item.sizes,
      whatsappNumber: item.whatsappNumber,
      photos: item.photos.join(", "),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!auth) {
    return (
      <div className="admin-login">
        <h2>Área restrita</h2>
        <form onSubmit={login} className="admin-login-form">
          <input
            type="password"
            placeholder="Senha de acesso"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="filter-input"
            autoComplete="current-password"
          />
          {pwError && <p className="admin-error">Senha incorreta.</p>}
          <button type="submit" className="btn-wpp">Entrar</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>Painel administrador — Ateliê</h2>
        <button onClick={() => setAuth(false)} className="sidebar-link" style={{ marginLeft: "auto" }}>
          Sair
        </button>
      </div>

      {feedback && <div className="admin-feedback">{feedback}</div>}

      <form onSubmit={handleSave} className="admin-form">
        <h3>{editing ? "Editar peça" : "Adicionar nova peça"}</h3>

        <div className="form-field">
          <label>Nome</label>
          <input className="filter-input" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nome da peça" />
        </div>

        <div className="form-field">
          <label>Descrição</label>
          <textarea className="filter-input" required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Descrição, materiais, intenção..." style={{ resize: "vertical" }} />
        </div>

        <div className="admin-form-row">
          <div className="form-field">
            <label>Preço (R$)</label>
            <input className="filter-input" type="number" min="0" step="0.01" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0,00" />
          </div>
          <div className="form-field">
            <label>WhatsApp (com código do país)</label>
            <input className="filter-input" value={form.whatsappNumber} onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })} placeholder="5511999999999" />
          </div>
        </div>

        <div className="form-field">
          <label>Tamanhos disponíveis</label>
          <div className="filter-sizes">
            {SIZES.map((s) => (
              <button key={s} type="button" className={`size-btn${form.sizes.includes(s) ? " active" : ""}`} onClick={() => toggleSize(s)}>{s}</button>
            ))}
          </div>
        </div>

        <div className="form-field">
          <label>URLs das fotos (separadas por vírgula)</label>
          <input className="filter-input" value={form.photos} onChange={(e) => setForm({ ...form, photos: e.target.value })} placeholder="/images/peca1.jpg, /images/peca2.jpg" />
        </div>

        <div className="admin-form-actions">
          <button type="submit" className="btn-wpp">{editing ? "Salvar alterações" : "Adicionar peça"}</button>
          {editing && (
            <button type="button" className="sidebar-link" onClick={() => { setEditing(null); setForm(emptyForm()); }}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="admin-items">
        <h3>Peças cadastradas ({items.length})</h3>
        <ul ref={listRef}>
          {items.map((item: ClothingItem) => (
            <li key={item.id} className="admin-item-row">
              <img src={item.photos[0]} alt={item.name} className="admin-item-thumb" />
              <div className="admin-item-info">
                <strong>{item.name}</strong>
                <span>R$ {item.price.toFixed(2)} · {item.sizes.join(", ")}</span>
              </div>
              <div className="admin-item-actions">
                <button className="sidebar-link" onClick={() => startEdit(item)}>Editar</button>
                <button className="sidebar-link" style={{ color: "#f66" }} onClick={() => removeItem(item.id)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
