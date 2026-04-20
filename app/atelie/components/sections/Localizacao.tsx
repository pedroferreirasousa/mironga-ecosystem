"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { IconMapPin, IconClock, IconBus, IconExternalLink } from "../Icons";

export default function Localizacao() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current.querySelectorAll(".animate-in"),
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.5, ease: "power3.out" }
    );
  }, []);

  return (
    <section className="section-container" id="localizacao" ref={ref}>
      <div className="section-header animate-in">
        <h2 className="section-title">Nossa localização</h2>
        <p className="section-sub">Venha nos visitar e sentir a energia do espaço.</p>
      </div>

      <div className="entrega-brasil animate-in">
        <div className="entrega-item">
          <span className="entrega-icon">🇧🇷</span>
          <div>
            <strong>Entregamos para todo o Brasil</strong>
            <p>Enviamos por PAC, SEDEX e transportadoras parceiras. Prazo e frete calculados no momento do pedido via WhatsApp.</p>
          </div>
        </div>
        <div className="entrega-item">
          <span className="entrega-icon">📦</span>
          <div>
            <strong>Embalagem especial</strong>
            <p>Cada peça é embalada com cuidado, protegida e identificada com a energia do ateliê.</p>
          </div>
        </div>
        <div className="entrega-item">
          <span className="entrega-icon">✂️</span>
          <div>
            <strong>Peças sob encomenda</strong>
            <p>Confeccionamos em até 15 dias úteis. Você acompanha o andamento direto pelo nosso WhatsApp.</p>
          </div>
        </div>
      </div>

      <div className="localizacao-grid animate-in">
        <div className="localizacao-info">
          <div className="info-item">
            <span className="info-icon"><IconMapPin size={18} /></span>
            <div>
              <strong>Endereço</strong>
              <p>Rua das Almas, 123 — Bairro da Mironga<br />São Paulo, SP — CEP 00000-000</p>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon"><IconClock size={18} /></span>
            <div>
              <strong>Horário de funcionamento</strong>
              <p>Segunda a sexta: 10h às 18h<br />Sábados: 10h às 14h</p>
            </div>
          </div>
          <div className="info-item">
            <span className="info-icon"><IconBus size={18} /></span>
            <div>
              <strong>Como chegar</strong>
              <p>Metrô linha 2 — Verde, estação Vila Madalena.<br />Ônibus 709A/819P.</p>
            </div>
          </div>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wpp"
            style={{ marginTop: "1rem", display: "inline-flex" }}
          >
            <IconExternalLink size={16} /> Abrir no Google Maps
          </a>
        </div>

        <div className="localizacao-map">
          {/* Placeholder de mapa — adicione um iframe do Google Maps com o endereço real */}
          <div className="map-placeholder">
            <IconMapPin size={36} />
            <p>Mapa em breve</p>
            <small>Substitua por um iframe do Google Maps com o endereço real.</small>
          </div>
        </div>
      </div>
    </section>
  );
}
