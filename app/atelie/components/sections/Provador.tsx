"use client";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { IconUser, IconRuler, IconShirt, IconEye, IconCheckCircle } from "../Icons";

export default function Provador() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current.querySelectorAll(".animate-in"),
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.55, ease: "power3.out" }
    );
  }, []);

  return (
    <section className="section-container" id="provador" ref={ref}>
      <div className="section-header animate-in">
        <h2 className="section-title">Provador inteligente</h2>
        <p className="section-sub">Experimente virtualmente antes de comprar.</p>
      </div>

      <div className="provador-hero animate-in">
        <div className="provador-badge">Em breve</div>
        <div className="provador-icon" aria-hidden="true"><IconUser size={44} /></div>
        <h3>Tecnologia de realidade aumentada</h3>
        <p>
          Estamos desenvolvendo um provador virtual com IA que permite você
          visualizar como cada peça ficará no seu corpo antes mesmo de encomendar.
          Informe suas medidas e experimente qualquer peça do nosso catálogo.
        </p>

        <div className="provador-features">
          {([
            { icon: <IconRuler size={22} />,       label: "Informe suas medidas" },
            { icon: <IconShirt size={22} />,        label: "Escolha a peça" },
            { icon: <IconEye size={22} />,          label: "Veja no seu corpo" },
            { icon: <IconCheckCircle size={22} />,  label: "Encomende com segurança" },
          ] as { icon: ReactNode; label: string }[]).map((f) => (
            <div key={f.label} className="provador-step">
              <div className="provador-step-icon" aria-hidden="true">{f.icon}</div>
              <p>{f.label}</p>
            </div>
          ))}
        </div>

        <form className="provador-notify animate-in" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="provador-email">Avise-me quando lançar</label>
          <div className="provador-notify-row">
            <input
              id="provador-email"
              type="email"
              placeholder="seu@email.com"
              className="filter-input"
            />
            <button type="submit" className="btn-wpp">Me avise</button>
          </div>
        </form>
      </div>
    </section>
  );
}
