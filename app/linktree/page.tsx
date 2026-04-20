"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function Linktree() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Animação de "stagger" (um por um)
    gsap.to(".link-card", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, []);

  return (
    <main ref={containerRef} className="linktree-content">
      <div className="profile-photo">
        <img src="/images/logo_linktree.png" alt="Logo Mironga" className="avatar" />
      </div>
      <h1 className="site-title">Casarão da Mironga</h1>
      <p className="site-sub">Mini Descrição</p>

      <Link href="/casarao" className="link-card" aria-label="Casarão da Mironga">
        <span className="label">Casarão da Mironga - Produtos de axé</span>
      </Link>

      <Link href="/atelie" className="link-card">
        <span className="label">Ateliê Luz das Almas - Peças Exclusivas</span>
      </Link>

      <a href="https://wa.me/seunumeroaqui" className="link-card">
        <span className="label">Falar no WhatsApp</span>
      </a>
    </main>
  );
}