"use client";
import { useState, useEffect, useCallback } from "react";
import type { ClothingItem } from "./types";

const STORAGE_KEY = "atelie_items";

const MOCK_ITEMS: ClothingItem[] = [
  {
    id: "1",
    name: "Conjunto Ritual das Almas",
    description: "Conjunto exclusivo em algodão tingido à mão, inspirado nos rituais de terreiro. Peça única, feita com muito amor e intenção.",
    price: 320,
    sizes: ["P", "M", "G"],
    photos: ["/images/logo_linktree.png"],
    whatsappNumber: "5511999999999",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "2",
    name: "Saia Encantada de Oxum",
    description: "Saia longa em tecido dourado com bordados de contas. Ideal para cerimônias e celebrações. Confeccionada artesanalmente.",
    price: 280,
    sizes: ["P", "M", "G", "GG"],
    photos: ["/images/logo_linktree.png"],
    whatsappNumber: "5511999999999",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: "3",
    name: "Blusa Ancestral Bordada",
    description: "Blusa de linho com bordados manuais de símbolos ancestrais. Conforto e espiritualidade numa só peça.",
    price: 180,
    sizes: ["PP", "P", "M"],
    photos: ["/images/logo_linktree.png"],
    whatsappNumber: "5511999999999",
    createdAt: new Date().toISOString(),
  },
];

export function useAtelieStore() {
  const [items, setItems] = useState<ClothingItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      setItems(raw ? JSON.parse(raw) : MOCK_ITEMS);
    } catch {
      setItems(MOCK_ITEMS);
    }
  }, []);

  const save = useCallback((next: ClothingItem[]) => {
    setItems(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const addItem = useCallback(
    (item: Omit<ClothingItem, "id" | "createdAt">) => {
      const newItem: ClothingItem = {
        ...item,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      };
      save([newItem, ...items]);
      return newItem;
    },
    [items, save]
  );

  const removeItem = useCallback(
    (id: string) => {
      save(items.filter((i) => i.id !== id));
    },
    [items, save]
  );

  const updateItem = useCallback(
    (updated: ClothingItem) => {
      save(items.map((i) => (i.id === updated.id ? updated : i)));
    },
    [items, save]
  );

  return { items, addItem, removeItem, updateItem };
}
