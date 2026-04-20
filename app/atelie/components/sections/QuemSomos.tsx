"use client";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { IconLeaf, IconSun, IconScissors, IconUsers } from "../Icons";

export default function QuemSomos() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current.querySelectorAll(".animate-in"),
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: "power3.out" }
    );
  }, []);

  return (
    <section className="section-container" id="quemsomos" ref={ref}>
      <div className="section-header animate-in">
        <h2 className="section-title">Quem somos</h2>
        <p className="section-sub">Uma olhada por trás das agulhas e dos tecidos.</p>
      </div>

      <div className="quem-somos-grid">
        <div className="quem-somos-photo animate-in">
          <img src="/images/logo_linktree.png" alt="Ateliê Luz das Almas" />
        </div>
        <div className="quem-somos-text animate-in">
          <h3>Ateliê Luz das Almas</h3>
          <p>
            Nascemos da vontade de unir arte, espiritualidade e moda consciente.
            Cada peça é concebida com intenção, costurada manualmente e imbuída
            de energia positiva pelos nossos artesãos.
          </p>
          <p>
            Trabalhamos com tecidos naturais, tingimentos à base de ervas e
            processos que respeitam a natureza e as tradições dos povos de
            terreiro. Nossa missão é vestir a alma, não apenas o corpo.
          </p>
        </div>
      </div>

      <div className="valores-grid animate-in">
        {([
          { icon: <IconLeaf size={22} />,    title: "Sustentabilidade", desc: "Materiais naturais e processos conscientes." },
          { icon: <IconSun size={22} />,     title: "Espiritualidade",  desc: "Cada costura carrega uma oração." },
          { icon: <IconScissors size={22} />,title: "Artesanato",       desc: "Peças únicas, feitas à mão com dedicação." },
          { icon: <IconUsers size={22} />,   title: "Comunidade",       desc: "Apoiamos a cultura dos povos de axé." },
        ] as { icon: ReactNode; title: string; desc: string }[]).map((v) => (
          <div key={v.title} className="valor-card">
            <div className="valor-icon" aria-hidden="true">{v.icon}</div>
            <h4>{v.title}</h4>
            <p>{v.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
