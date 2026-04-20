"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { IconPhone, IconMail, IconInstagram, IconCheckCircle } from "../Icons";

export default function Contato() {
  const ref = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current.querySelectorAll(".animate-in"),
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.5, ease: "power3.out" }
    );
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
    const wppMsg = encodeURIComponent(`Olá! Sou *${name}*.\n\n${message}`);
    window.open(`https://wa.me/5511999999999?text=${wppMsg}`, "_blank", "noopener");
    setSent(true);
  }

  return (
    <section className="section-container" id="contato" ref={ref}>
      <div className="section-header animate-in">
        <h2 className="section-title">Entrar em contato</h2>
        <p className="section-sub">Estamos aqui para tirar todas as suas dúvidas.</p>
      </div>

      <div className="contato-grid animate-in">
        <div className="contato-channels">
          <h3>Nos encontre em</h3>
          <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="channel-item wpp">
            <span className="channel-icon"><IconPhone size={20} /></span>
            <div>
              <strong>WhatsApp</strong>
              <p>Resposta rápida, horário comercial</p>
            </div>
          </a>
          <a href="mailto:contato@atelie.com" className="channel-item">
            <span className="channel-icon"><IconMail size={20} /></span>
            <div>
              <strong>E-mail</strong>
              <p>contato@atelie.com</p>
            </div>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="channel-item">
            <span className="channel-icon"><IconInstagram size={20} /></span>
            <div>
              <strong>Instagram</strong>
              <p>@atelie.luzdasalmas</p>
            </div>
          </a>
        </div>

        <form className="contato-form" onSubmit={handleSubmit}>
          <h3>Envie uma mensagem</h3>
          {sent ? (
            <div className="contato-success">
              <IconCheckCircle size={40} />
              <p>WhatsApp aberto! Esperamos sua mensagem. 💛</p>
              <button type="button" className="btn-wpp" onClick={() => setSent(false)}>Enviar outra</button>
            </div>
          ) : (
            <>
              <div className="form-field">
                <label htmlFor="contact-name">Seu nome</label>
                <input id="contact-name" name="name" type="text" placeholder="Maria das Almas" className="filter-input" required />
              </div>
              <div className="form-field">
                <label htmlFor="contact-subject">Assunto</label>
                <input id="contact-subject" name="subject" type="text" placeholder="Dúvida sobre tamanho, encomenda..." className="filter-input" />
              </div>
              <div className="form-field">
                <label htmlFor="contact-message">Mensagem</label>
                <textarea id="contact-message" name="message" rows={4} placeholder="Escreva aqui..." className="filter-input" style={{ resize: "vertical" }} required />
              </div>
              <button type="submit" className="btn-wpp">
                <IconPhone size={16} /> Enviar via WhatsApp
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
