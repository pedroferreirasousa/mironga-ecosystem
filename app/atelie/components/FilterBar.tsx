"use client";
import type { FilterState, SortOption } from "../types";

const SIZES = ["PP", "P", "M", "G", "GG", "XGG"];

interface Props {
  filter: FilterState;
  onChange: (f: FilterState) => void;
}

export default function FilterBar({ filter, onChange }: Props) {
  return (
    <div className="filter-bar">
      <input
        type="search"
        placeholder="Buscar peça..."
        value={filter.search}
        onChange={(e) => onChange({ ...filter, search: e.target.value })}
        className="filter-input"
        aria-label="Buscar peça pelo nome"
      />

      <div className="filter-group">
        <label className="filter-label">Tamanho</label>
        <div className="filter-sizes">
          <button
            className={`size-btn${filter.size === "" ? " active" : ""}`}
            onClick={() => onChange({ ...filter, size: "" })}
          >
            Todos
          </button>
          {SIZES.map((s) => (
            <button
              key={s}
              className={`size-btn${filter.size === s ? " active" : ""}`}
              onClick={() => onChange({ ...filter, size: s })}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-select" className="filter-label">Ordenar por</label>
        <select
          id="sort-select"
          value={filter.sort}
          onChange={(e) => onChange({ ...filter, sort: e.target.value as SortOption })}
          className="filter-select"
        >
          <option value="recent">Mais recentes</option>
          <option value="oldest">Mais antigas</option>
          <option value="price_asc">Menor preço</option>
          <option value="price_desc">Maior preço</option>
        </select>
      </div>
    </div>
  );
}
