"use client";
import type { ReactNode } from "react";
import Link from "next/link";
import { IconTag, IconUser, IconInfo, IconMapPin, IconMessageSquare, IconArrowLeft } from "./Icons";

interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
}

interface Props {
  activeSection: string;
  onNav: (id: string) => void;
  onClose: () => void;
}

const navItems: NavItem[] = [
  { id: "pecas",       label: "Peças pronta entrega",  icon: <IconTag size={18} /> },
  { id: "provador",   label: "Provador inteligente",  icon: <IconUser size={18} /> },
  { id: "quemsomos",  label: "Quem somos",            icon: <IconInfo size={18} /> },
  { id: "localizacao",label: "Nossa localização",     icon: <IconMapPin size={18} /> },
  { id: "contato",    label: "Entrar em contato",     icon: <IconMessageSquare size={18} /> },
];

export default function SidebarNav({ activeSection, onNav, onClose }: Props) {
  return (
    <>
      <div className="sidebar-brand">
        <img src="/images/logo_linktree.png" alt="Ateliê" className="avatar sm" />
        <div>
          <h2 className="sidebar-title">Luz das Almas</h2>
          <p className="sidebar-sub">Ateliê exclusivo</p>
        </div>
      </div>

      <nav aria-label="Ateliê navigation">
        <ul className="sidebar-nav-list">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className={`sidebar-link${activeSection === item.id ? " active" : ""}`}
                onClick={() => {
                  onNav(item.id);
                  onClose();
                }}
              >
                <span className="sidebar-icon" aria-hidden="true">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <Link href="/" className="sidebar-back">
          <IconArrowLeft size={14} /> Voltar ao início
        </Link>
      </div>
    </>
  );
}
