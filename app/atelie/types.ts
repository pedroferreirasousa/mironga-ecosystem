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

export interface ProvadorSelection {
  clothingTypeId: string;
  primaryColor: string;   // ColorSwatch id
  secondaryColor: string; // ColorSwatch id or ""
  accentColor: string;    // ColorSwatch id or ""
  fabricId: string;
  styleId: string;
  description: string;
  photoFile: File | null;
  photoPreviewUrl: string;
}

export interface ProvadorResult {
  imageUrl: string;
  prompt: string;
}
