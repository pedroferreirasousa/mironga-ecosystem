/**
 * Provador Inteligente — opções de roupas de matriz africana.
 * Candes (Candomblé, Umbanda, Quimbanda, Jurema Sagrada, Macumba Carioca).
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
  { id: "saia-rodada",  label: "Saia Rodada",       icon: "skirt" },
  { id: "bata-afro",    label: "Bata / Blusa Afro",  icon: "blouse" },
  { id: "vestido-axe",  label: "Vestido de Axé",     icon: "dress" },
  { id: "conjunto",     label: "Conjunto",            icon: "set" },
  { id: "calca",        label: "Calça",               icon: "pants" },
  { id: "manto-capa",   label: "Manto / Capa",        icon: "overall" },
  { id: "turbante-oja", label: "Turbante / Ojá",      icon: "shirt" },
  { id: "macacao",      label: "Macacão",             icon: "overall" },
];

export const FABRICS: FabricOption[] = [
  { id: "algodao",  label: "Algodão" },
  { id: "linho",    label: "Linho" },
  { id: "renda",    label: "Renda" },
  { id: "organza",  label: "Organza" },
  { id: "veludo",   label: "Veludo" },
  { id: "cetim",    label: "Cetim" },
  { id: "voile",    label: "Voil" },
  { id: "croche",   label: "Crochê" },
];

// Estilos por entidade / orixá / tradição
export const STYLES: StyleOption[] = [
  { id: "iemanja",    label: "Iemanjá"          },  // azul e branco, fluido
  { id: "oxum",       label: "Oxum"              },  // dourado e amarelo
  { id: "iansa",      label: "Iansã / Oyá"       },  // vermelho e marrom
  { id: "ogum",       label: "Ogum"              },  // azul escuro e verde
  { id: "xango",      label: "Xangô"             },  // vermelho e branco
  { id: "oxossi",     label: "Oxóssi"            },  // verde e azul
  { id: "oxala",      label: "Oxalá"             },  // branco puro
  { id: "pomba-gira", label: "Pombagira"         },  // vermelho e preto
  { id: "preto-velho",label: "Preto Velho"       },  // branco e azul
  { id: "caboclo",    label: "Caboclo / Jurema"  },  // verde e amarelo
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
