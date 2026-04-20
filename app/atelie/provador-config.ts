/**
 * Provador Inteligente — Ateliê Luz das Almas
 * Modelos de roupa base para roupas de matriz africana e sagradas.
 * Funciona para qualquer entidade: Pombagira, Exu, Caboclo, Marinheiro,
 * Boiadeiro, Preto-Velho, Cigana, Baiana, etc.
 */

import type { ClothingStyle, FabricOption, ColorSwatch } from "./types";

export const CLOTHING_STYLES: ClothingStyle[] = [
  // ── Feminino ──────────────────────────────────────────────────────
  {
    id: "saia-rodada-babados",
    label: "Saia Rodada de Babados",
    description: "Múltiplas camadas de babados do quadril até o chão — volumosa e dramática. Pombagira, Cigana, Giras.",
    gender: "feminino",
    promptKeywords:
      "complete floor-length voluminous ruffled sacred dress, extremely full multi-tiered ruffled ball skirt cascading from waist all the way to floor, structured fitted strapless bodice, multiple ruffled layers each wider than the previous creating enormous volume, skirt touching the ground and filling entire frame below waist, artisanal sacred ritual fashion",
    suggestedColors: ["vermelho", "preto", "amarelo"],
  },
  {
    id: "vestido-longo-renda",
    label: "Vestido Longo de Renda",
    description: "Vestido elegante com renda do decote ao chão — sofisticado e sagrado. Pombagira elegante, Yemanjá.",
    gender: "feminino",
    promptKeywords:
      "complete floor-length elegant lace gown covering entire body from off-shoulder neckline to floor, delicate lace overlay on satin underlayer throughout, fitted bodice, full-length lace skirt reaching the ground, graceful flowing silhouette, elegant sacred ceremonial fashion",
    suggestedColors: ["branco", "vermelho", "azul"],
  },
  {
    id: "conjunto-cigano",
    label: "Conjunto Cigano",
    description: "Blusa ombro a ombro + cinto de moedas + saia colorida de camadas. Cigana, Pombagira Cigana.",
    gender: "feminino",
    promptKeywords:
      "complete floor-length Romani gypsy sacred outfit, wide off-shoulder loose blouse with ruffled sleeves, coin-adorned belt at waist, extremely full colorful multi-tier ruffled maxi skirt in contrasting colors reaching floor, wide layers of ruffles filling entire lower body all the way to ground, bohemian sacred fashion",
    suggestedColors: ["vermelho", "laranja", "roxo"],
  },
  {
    id: "bata-gira-saia",
    label: "Bata de Gira com Saia",
    description: "Blusa solta de gira com saia rodada longa — clássico das giras de Umbanda.",
    gender: "feminino",
    promptKeywords:
      "complete sacred ritual gira outfit, classic loose-fitting ritual blouse with lace trim at collar and sleeves, matching full-length floor-reaching skirt with lace trim around hem, elegant sacred ceremonial wear, complete outfit from shoulders to floor, artisanal Umbanda ritual fashion",
    suggestedColors: ["branco", "azul", "rosa"],
  },
  {
    id: "vestido-gode-longo",
    label: "Vestido Godê Longo",
    description: "Busto justo + saia godê que se abre dramaticamente até o chão. Elegante e fluido.",
    gender: "feminino",
    promptKeywords:
      "complete floor-length elegant godê cut dress, fitted bodice tapering to waist, dramatically flared godê skirt spreading very wide from hips all the way to floor, circular flare silhouette, satin fabric with lace detailing, elegant sacred fashion covering entire body from neckline to floor",
    suggestedColors: ["vermelho", "roxo", "preto"],
  },
  // ── Masculino ─────────────────────────────────────────────────────
  {
    id: "terno-capa-sacramental",
    label: "Terno com Capa Sacramental",
    description: "Terno formal + capa longa dramática que vai até o chão. Exu, Zé Pilintra, falange da esquerda.",
    gender: "masculino",
    promptKeywords:
      "complete full-body sacred ritual outfit, dramatic floor-length cape falling from shoulders all the way to floor, open wide to reveal formal suit jacket and dress shirt beneath, formal dress trousers and shoes visible below cape hem, cape spreading dramatically at sides, top hat, complete sacred attire from head to floor, powerful commanding silhouette",
    suggestedColors: ["preto", "vermelho", "dourado"],
  },
  {
    id: "terno-formal-sagrado",
    label: "Terno Formal Sagrado",
    description: "Terno completo com gravata — elegante e poderoso. Exu Marabô, Exu Veludo.",
    gender: "masculino",
    promptKeywords:
      "complete formal sacred suit covering entire body, satin-lapel formal suit jacket with white dress shirt and elegant tie, formal dress trousers falling straight to polished leather shoes, complete tailored formal outfit from collar to shoes, elegant ceremonial attire",
    suggestedColors: ["preto", "dourado", "vinho"],
  },
  {
    id: "capa-dramatica-longa",
    label: "Capa Dramática Longa",
    description: "Capa longa até o chão como peça principal — imponente e sagrada. Exu, Ogum, entidades de capa.",
    gender: "masculino",
    promptKeywords:
      "dramatic floor-length sacred cape as main garment, extremely long flowing cape spread open from shoulders all the way to floor, cape billowing wide to reveal simple outfit beneath, floor-sweeping silhouette, ceremonial full-length cape, simple formal pants and shoes visible, sacred ritual cape attire complete",
    suggestedColors: ["preto", "vermelho", "azul"],
  },
  {
    id: "farda-marinheiro",
    label: "Farda de Marinheiro",
    description: "Farda naval completa — branca com detalhes azuis. Marinheiro, entidades do mar.",
    gender: "masculino",
    promptKeywords:
      "complete sailor uniform from collar to shoes, classic navy blue and white sailor dress uniform, white naval shirt with large traditional sailor collar, navy blue wide-leg sailor trousers with white stripe, white sailor cap, complete maritime sacred Marinheiro spirit attire",
    suggestedColors: ["branco", "azul", "dourado"],
  },
  {
    id: "bata-caboclo",
    label: "Bata de Caboclo",
    description: "Túnica rústica com bordados indígenas, franja e couro — Caboclo, Boiadeiro.",
    gender: "masculino",
    promptKeywords:
      "complete indigenous-inspired sacred attire from shoulders to feet, natural earth-tone long tunic with geometric tribal embroidery and fringe leather details, wide leather belt, loose natural-fiber pants, rugged boots, complete Caboclo sacred outfit full body",
    suggestedColors: ["bege", "verde", "dourado"],
  },
  {
    id: "roupa-boiadeiro",
    label: "Roupa de Boiadeiro",
    description: "Chapéu de couro, camisa xadrez, cinto de couro — Boiadeiro, Boi.",
    gender: "masculino",
    promptKeywords:
      "complete cowboy-rustic sacred outfit from hat to boots, wide-brim leather cowboy hat, plaid flannel shirt with large bandana tied at neck, sturdy thick leather belt with large buckle, wide-leg canvas work pants, leather cowboy boots, Boiadeiro sacred spirit attire complete from head to toe",
    suggestedColors: ["bege", "vermelho", "preto"],
  },
  // ── Unissex ───────────────────────────────────────────────────────
  {
    id: "manto-bordado-longo",
    label: "Manto Bordado Longo",
    description: "Manto comprido com bordados sacros — Preto-Velho, Oxalá, Nanã, entidades de manto.",
    gender: "unissex",
    promptKeywords:
      "complete floor-length embroidered sacred manto robe covering entire body, long flowing formal robe falling from shoulders all the way to floor, intricate symbolic embroidery throughout robe panels, wide flowing sleeves, complete ceremonial vestment, dignified sacred full-body robe",
    suggestedColors: ["branco", "roxo", "dourado"],
  },
];

export const FABRICS: FabricOption[] = [
  { id: "cetim",   label: "Cetim" },
  { id: "veludo",  label: "Veludo" },
  { id: "renda",   label: "Renda" },
  { id: "organza", label: "Organza" },
  { id: "voile",   label: "Voil" },
  { id: "algodao", label: "Algodão" },
  { id: "croche",  label: "Crochê" },
  { id: "linho",   label: "Linho" },
];

export const COLOR_SWATCHES: ColorSwatch[] = [
  { id: "vermelho", label: "Vermelho",  hex: "#B83020" },
  { id: "preto",    label: "Preto",     hex: "#1A1A1A" },
  { id: "branco",   label: "Branco",    hex: "#F5F0E8" },
  { id: "dourado",  label: "Dourado",   hex: "#D4A030" },
  { id: "rosa",     label: "Rosa",      hex: "#D07080" },
  { id: "roxo",     label: "Roxo",      hex: "#703090" },
  { id: "azul",     label: "Azul",      hex: "#2060A0" },
  { id: "verde",    label: "Verde",     hex: "#307050" },
  { id: "laranja",  label: "Laranja",   hex: "#E87020" },
  { id: "amarelo",  label: "Amarelo",   hex: "#F0C040" },
  { id: "grafite",  label: "Grafite",   hex: "#505050" },
  { id: "vinho",    label: "Vinho",     hex: "#6B1020" },
  { id: "bege",     label: "Bege",      hex: "#C8B89A" },
  { id: "none",     label: "Nenhuma",   hex: "transparent" },
];

export const ATELIE_WHATSAPP = "5511999999999";
