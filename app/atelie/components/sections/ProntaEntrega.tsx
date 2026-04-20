"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import gsap from "gsap";
import type { ClothingItem, FilterState } from "../../types";
import ItemCard from "../ItemCard";
import FilterBar from "../FilterBar";
import { IconSearch } from "../Icons";

interface Props {
  items: ClothingItem[];
}

export default function ProntaEntrega({ items }: Props) {
  const listRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<FilterState>({
    search: "",
    size: "",
    sort: "recent",
  });

  const filtered = useMemo(() => {
    let result = [...items];

    if (filter.search.trim()) {
      const q = filter.search.toLowerCase();
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q)
      );
    }

    if (filter.size) {
      result = result.filter((i) => i.sizes.includes(filter.size));
    }

    switch (filter.sort) {
      case "recent":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;
    }

    return result;
  }, [items, filter]);

  useEffect(() => {
    if (!listRef.current) return;
    gsap.fromTo(
      listRef.current.querySelectorAll(".item-card"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.45, ease: "power3.out" }
    );
  }, [filtered]);

  return (
    <section className="section-container" id="pecas">
      <div className="section-header">
        <h2 className="section-title">Peças pronta entrega</h2>
        <p className="section-sub">Confeccionadas com amor e intenção — disponíveis para envio imediato.</p>
      </div>

      <FilterBar filter={filter} onChange={setFilter} />

      {filtered.length === 0 ? (
        <div className="empty-state">
          <IconSearch size={36} />
          <p>Nenhuma peça encontrada com esses filtros.</p>
        </div>
      ) : (
        <div className="items-grid" ref={listRef}>
          {filtered.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}
