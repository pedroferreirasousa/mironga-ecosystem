export interface ClothingItem {
  id: string;
  name: string;
  description: string;
  price: number;
  sizes: string[];
  photos: string[];
  whatsappNumber: string;
  createdAt: string;
}

export type SortOption = "recent" | "oldest" | "price_asc" | "price_desc";

export interface FilterState {
  search: string;
  size: string;
  sort: SortOption;
}

// ─── Provador Inteligente ─────────────────────────────────────

export interface ClothingTypeOption {
  id: string;
  label: string;
  icon: string; // e.g. "shirt", "skirt" — maps to SVG icon key
  description?: string;
}

export interface FabricOption {
  id: string;
  label: string;
}

export interface StyleOption {
  id: string;
  label: string;
}

export interface ColorSwatch {
  id: string;
  label: string;
  hex: string;
}

export interface ClothingStyle {
  id: string;
  label: string;
  description: string;
  gender: "feminino" | "masculino" | "unissex";
  promptKeywords: string;
  suggestedColors: string[]; // ColorSwatch ids
}

export interface ProvadorSelection {
  styleId: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fabricId: string;
  description: string;
  photoFile: File | null;
  photoPreviewUrl: string;
}

export interface ProvadorResult {
  imageUrl: string;
  prompt: string;
}
