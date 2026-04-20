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
