"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import SidebarNav from "./components/SidebarNav";
import ProntaEntrega from "./components/sections/ProntaEntrega";
import QuemSomos from "./components/sections/QuemSomos";
import Provador from "./components/sections/Provador";
import Localizacao from "./components/sections/Localizacao";
import Contato from "./components/sections/Contato";
import { IconLock } from "./components/Icons";
import { useAtelieStore } from "./store";

type Section = "pecas" | "provador" | "quemsomos" | "localizacao" | "contato";

export default function AteliePage() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Section>("pecas");
  const contentRef = useRef<HTMLDivElement>(null);
  const { items } = useAtelieStore();

  function navigateTo(id: string) {
    if (!contentRef.current) {
      setActive(id as Section);
      return;
    }
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 12,
      duration: 0.18,
      ease: "power2.in",
      onComplete: () => {
        setActive(id as Section);
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
        );
      },
    });
  }

  // Animate hamburger lines into X / back
  useEffect(() => {
    const lines = document.querySelectorAll<HTMLElement>(".hamburger span");
    if (lines.length < 3) return;
    if (open) {
      gsap.to(lines[0], { rotate: 45, y: 7, duration: 0.22 });
      gsap.to(lines[1], { opacity: 0, duration: 0.15 });
      gsap.to(lines[2], { rotate: -45, y: -7, duration: 0.22 });
    } else {
      gsap.to(lines[0], { rotate: 0, y: 0, duration: 0.22 });
      gsap.to(lines[1], { opacity: 1, duration: 0.15 });
      gsap.to(lines[2], { rotate: 0, y: 0, duration: 0.22 });
    }
  }, [open]);

  const sectionMap: Record<Section, React.ReactNode> = {
    pecas: <ProntaEntrega items={items} />,
    provador: <Provador />,
    quemsomos: <QuemSomos />,
    localizacao: <Localizacao />,
    contato: <Contato />,
  };

  return (
    <div className="atelie-page">
      {/* Dark overlay for mobile sidebar */}
      <div
        className={`sidebar-overlay${open ? " visible" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <aside className={`atelie-sidebar${open ? " open" : ""}`}>
        <div className="sidebar-inner">
          <SidebarNav
            activeSection={active}
            onNav={navigateTo}
            onClose={() => setOpen(false)}
          />
        </div>
      </aside>

      <div className="atelie-main">
        <header className="atelie-header">
          <button
            className="hamburger"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
          <div className="header-brand">
            <span className="site-title">Luz das Almas</span>
            <span className="site-sub">Ateliê exclusivo</span>
          </div>
          <Link href="/atelie/admin" className="header-admin-link">
            <IconLock size={13} /> Admin
          </Link>
        </header>

        <div className="atelie-content" ref={contentRef}>
          {sectionMap[active]}
        </div>
      </div>
    </div>
  );
}
