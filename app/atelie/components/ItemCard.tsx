"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { ClothingItem } from "../types";

interface Props {
  item: ClothingItem;
}

export default function ItemCard({ item }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
    );
  }, []);

  const whatsappMsg = encodeURIComponent(
    `Olá! Tenho interesse na peça: *${item.name}* (R$${item.price.toFixed(2)}). Poderia me dar mais informações?`
  );
  const whatsappUrl = `https://wa.me/${item.whatsappNumber}?text=${whatsappMsg}`;

  return (
    <div className="item-card" ref={cardRef}>
      <div className="item-card__photo">
        <img
          src={item.photos[0] ?? "/images/logo_linktree.png"}
          alt={item.name}
          loading="lazy"
        />
      </div>
      <div className="item-card__body">
        <h4 className="item-card__name">{item.name}</h4>
        <p className="item-card__desc">{item.description}</p>
        <div className="item-card__sizes">
          {item.sizes.map((s) => (
            <span key={s} className="size-badge">{s}</span>
          ))}
        </div>
        <div className="item-card__footer">
          <span className="item-card__price">
            R$ {item.price.toFixed(2).replace(".", ",")}
          </span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wpp"
            aria-label={`Comprar ${item.name} pelo WhatsApp`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.272-.099-.47-.148-.668.15-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.372-.025-.52-.075-.149-.668-1.611-.916-2.206-.242-.579-.487-.5-.668-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.793.372-.272.298-1.04 1.016-1.04 2.479 0 1.463 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.124 1.528 5.852L.057 23.571a.5.5 0 0 0 .614.614l5.719-1.471A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.956 9.956 0 0 1-5.127-1.414l-.366-.22-3.795.977.997-3.794-.24-.38A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            Comprar via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
