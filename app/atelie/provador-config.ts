/**
 * Provador Inteligente — opções configuráveis pelo admin.
 * Por ora são estáticas; quando o Supabase estiver integrado,
 * estas virão da tabela `atelie_options`.
 */

import type {
  ClothingTypeOption,
  FabricOption,
  StyleOption,
  ColorSwatch,
} from "./types";

export const CLOTHING_TYPES: ClothingTypeOption[] = [
  { id: "saia",      label: "Saia",         icon: "skirt" },
  { id: "camisa",    label: "Camisa",        icon: "shirt" },
  { id: "conjunto",  label: "Conjunto",      icon: "set" },
  { id: "calca",     label: "Calça",         icon: "pants" },
  { id: "vestido",   label: "Vestido",       icon: "dress" },
  { id: "blusa",     label: "Blusa",         icon: "blouse" },
  { id: "shorts",    label: "Shorts",        icon: "shorts" },
  { id: "macacao",   label: "Macacão",       icon: "overall" },
];

export const FABRICS: FabricOption[] = [
  { id: "algodao",   label: "Algodão" },
  { id: "linho",     label: "Linho" },
  { id: "renda",     label: "Renda" },
  { id: "malha",     label: "Malha" },
  { id: "cetim",     label: "Cetim" },
  { id: "viscose",   label: "Viscose" },
  { id: "croche",    label: "Crochê" },
];

export const STYLES: StyleOption[] = [
  { id: "afro",      label: "Afro" },
  { id: "etnico",    label: "Étnico" },
  { id: "casual",    label: "Casual" },
  { id: "festivo",   label: "Festivo" },
  { id: "ceremonial",label: "Cerimonial" },
  { id: "boho",      label: "Boho" },
];

export const COLOR_SWATCHES: ColorSwatch[] = [
  { id: "branco",    label: "Branco",        hex: "#F5F0E8" },
  { id: "creme",     label: "Creme",         hex: "#E8DCC8" },
  { id: "bege",      label: "Bege",          hex: "#C8B89A" },
  { id: "terracota", label: "Terracota",     hex: "#C06040" },
  { id: "amarelo",   label: "Amarelo",       hex: "#F0C040" },
  { id: "dourado",   label: "Dourado",       hex: "#D4A030" },
  { id: "laranja",   label: "Laranja",       hex: "#E87020" },
  { id: "vermelho",  label: "Vermelho",      hex: "#B83020" },
  { id: "rosa",      label: "Rosa",          hex: "#D07080" },
  { id: "roxo",      label: "Roxo",          hex: "#703090" },
  { id: "azul",      label: "Azul",          hex: "#2060A0" },
  { id: "verde",     label: "Verde",         hex: "#307050" },
  { id: "preto",     label: "Preto",         hex: "#1A1A1A" },
  { id: "grafite",   label: "Grafite",       hex: "#404040" },
  { id: "none",      label: "Nenhuma",       hex: "transparent" },
];

export const ATELIE_WHATSAPP = "5511999999999";
