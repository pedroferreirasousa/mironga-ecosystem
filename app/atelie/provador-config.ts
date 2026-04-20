/**
 * Provador Inteligente — Ateliê Luz das Almas
 * Estilos para Pombagira e Exu (Umbanda, Candomblé, Quimbanda, Jurema Sagrada).
 * Quando o Supabase estiver integrado, estes dados virão de `atelie_entities`.
 */

import type { Entity, FabricOption, ColorSwatch } from "./types";

export const ENTITIES: Entity[] = [
  {
    id: "pombagira",
    label: "Pombagira",
    description:
      "Rainha das encruzilhadas. Vestes dramáticas, rodadas e sensuais — saias volumosas, renda, cetim e rosas.",
    styles: [
      {
        id: "maria-padilha",
        label: "Maria Padilha",
        description:
          "A mais elegante — vestido rodado vermelho com renda preta, corpete estruturado, rosas e decote.",
        promptKeywords:
          "spectacular red satin ballgown with black lace overlay, structured off-shoulder corset bodice, voluminous multi-tiered ruffled ball skirt, black lace trim on hem, red rose embellishments at waist, long dramatic train, Umbanda Candomblé sacred ritual gown",
        suggestedColors: ["vermelho", "preto"],
        clothingGender: "feminino",
      },
      {
        id: "sete-saias",
        label: "Sete Saias",
        description:
          "Sete camadas sobrepostas de saias coloridas, cada uma de uma cor diferente.",
        promptKeywords:
          "seven distinct layered ball skirts in different colors cascading from waist to floor, each layer a different vibrant color, short fitted sleeveless bodice, voluminous cascading rainbow layers, theatrical sacred fashion",
        suggestedColors: ["vermelho", "amarelo"],
        clothingGender: "feminino",
      },
      {
        id: "cigana",
        label: "Cigana",
        description:
          "Estilo cigano — saias coloridas de babados, cinto de moedas douradas, ombros à mostra.",
        promptKeywords:
          "gypsy Romani style, colorful tiered ruffled maxi skirt, off-shoulder peasant blouse with lace trim, coin belt at waist, flowing bohemian sacred garment, bright contrasting colors, wide sleeves with ruffles",
        suggestedColors: ["vermelho", "laranja"],
        clothingGender: "feminino",
      },
      {
        id: "rainha",
        label: "Rainha",
        description:
          "Pombagira Rainha — veludo suntuoso, renda dourada, vestido de baile real com coroa.",
        promptKeywords:
          "royal queen ball gown, deep red and black velvet, gold lace overlay and trim, dramatic puffed sleeves with lace cuffs, extremely full volume ball skirt, tiara crown, royal sacred Umbanda ritual garment, elaborate gold embroidery",
        suggestedColors: ["vermelho", "dourado"],
        clothingGender: "feminino",
      },
      {
        id: "das-almas",
        label: "Das Almas",
        description:
          "Ligada ao cemitério — branco e vermelho, flores negras, estilo gótico sagrado.",
        promptKeywords:
          "sacred gothic style, white and deep red contrast ball gown, black floral skull embroidery, cemetery spiritual aesthetic, black lace mourning veil details, dramatic dark romantic silhouette, roses and bones motifs",
        suggestedColors: ["branco", "vermelho"],
        clothingGender: "feminino",
      },
      {
        id: "meia-noite",
        label: "Meia-Noite",
        description:
          "Roxo e preto com estrelas e lua — misteriosa, noturna e luxuosa.",
        promptKeywords:
          "midnight goddess ballgown, deep purple-black, silver celestial stars and crescent moon embroidery throughout skirt, silver sequins and crystal beadwork, mysterious and luxurious, dramatic voluminous silhouette, sacred Umbanda night spirit fashion",
        suggestedColors: ["roxo", "preto"],
        clothingGender: "feminino",
      },
      {
        id: "menina",
        label: "Menina",
        description:
          "Jovem e alegre — rosa e vermelho, babados delicados, romantismo feminino.",
        promptKeywords:
          "feminine youthful sacred dress, pink and red layered ruffled ball skirt, delicate white lace and satin ribbon details, playful romantic silhouette, short puffed sleeves, full petticoat volume, Umbanda sacred spirit fashion",
        suggestedColors: ["rosa", "vermelho"],
        clothingGender: "feminino",
      },
      {
        id: "da-estrada",
        label: "Da Estrada",
        description:
          "Guardiã das estradas — vermelho e preto ousado, saias com fenda, poderosa.",
        promptKeywords:
          "bold road guardian style, deep red and black full ruffled ball skirt, fitted strapless bodice, dramatic front slit on skirt, bold asymmetric ruffles, powerful strong femme sacred ritual fashion",
        suggestedColors: ["vermelho", "preto"],
        clothingGender: "feminino",
      },
      {
        id: "rosa-caveira",
        label: "Rosa Caveira",
        description:
          "Rosas vermelhas com caveiras — estética gótica, morte e renascimento.",
        promptKeywords:
          "dark romantic gothic ball gown, red roses and skull motifs embroidered throughout, black base with red floral skull prints, dramatic ruffled layers, Day of Dead meets Umbanda sacred aesthetic, red lace overlay",
        suggestedColors: ["preto", "vermelho"],
        clothingGender: "feminino",
      },
    ],
  },
  {
    id: "exu",
    label: "Exú",
    description:
      "Guardião dos caminhos. Trajes poderosos — ternos escuros, capas dramáticas, cartola e bengala.",
    styles: [
      {
        id: "tranca-rua",
        label: "Tranca-Rua",
        description:
          "Guardião das ruas — terno preto com listras vermelhas, capa, cartola e bengala.",
        promptKeywords:
          "formal black suit with red vertical stripe details on jacket, long dramatic black cape with red lining, top hat, walking cane, crossroads guardian attire, powerful mystical sacred Umbanda fashion, black dress pants",
        suggestedColors: ["preto", "vermelho"],
        clothingGender: "masculino",
      },
      {
        id: "marabô",
        label: "Marabô",
        description:
          "O mais elegante dos Exus — casaca preta e dourada, cartola de abas largas.",
        promptKeywords:
          "most elegant exu, formal black tailcoat with gold trim along lapels and cuffs, long dramatic black satin cape lined with gold, tall top hat with gold hat band, sophisticated Quimbanda ritual fashion, black-gold luxury sacred attire, formal dress pants with gold stripe",
        suggestedColors: ["preto", "dourado"],
        clothingGender: "masculino",
      },
      {
        id: "sete-encruzilhadas",
        label: "Sete Encruzilhadas",
        description:
          "Sete encruzilhadas — capa longa vermelha e preta, poderoso e dramático.",
        promptKeywords:
          "dramatic full-length red and black sweeping cape, black formal tunic underneath with red sash belt, seven crossroads symbolism embroidery, powerful mystical sacred Quimbanda outfit, black boots, commanding dramatic silhouette",
        suggestedColors: ["preto", "vermelho"],
        clothingGender: "masculino",
      },
      {
        id: "veludo",
        label: "Veludo",
        description:
          "Sofisticado — terno completo de veludo preto com detalhes vermelho sangue.",
        promptKeywords:
          "luxurious all-black velvet suit, deep crimson-red velvet accents on lapels collar and cuffs, sophisticated formal sacred ritual attire, rich plush velvet texture throughout, powerful dark aesthetic",
        suggestedColors: ["preto", "vinho"],
        clothingGender: "masculino",
      },
      {
        id: "caveira",
        label: "Caveira",
        description:
          "Exu Caveira — preto e branco, caveiras bordadas, misticismo e ancestralidade.",
        promptKeywords:
          "skull exu sacred outfit, black formal suit with white skull motifs embroidered throughout, black-white contrast, dramatic skull embroidery on jacket and pants, dark mystical sacred ritual garment, gothic Umbanda aesthetic",
        suggestedColors: ["preto", "branco"],
        clothingGender: "masculino",
      },
      {
        id: "exu-rei",
        label: "Exu Rei",
        description:
          "Rei dos Exus — manto real preto e dourado, coroa, cetro, suntuoso.",
        promptKeywords:
          "king exu sacred royal attire, elaborate black and gold royal cape-robe, golden crown on head, ornate scepter, black formal suit underneath with gold embroidery, majestic sacred ritual fashion, large dramatic cape spread wide",
        suggestedColors: ["preto", "dourado"],
        clothingGender: "masculino",
      },
      {
        id: "morcego",
        label: "Morcego",
        description:
          "Exu Morcego — capa preta em forma de asa de morcego, sombrio e dramático.",
        promptKeywords:
          "bat exu, dramatic bat-wing shaped full-length black cape spread wide like wings, all black ritual attire underneath, gothic dark sacred outfit, mysterious dark powerful sacred fashion, bat wing silhouette cape spread open",
        suggestedColors: ["preto", "grafite"],
        clothingGender: "masculino",
      },
      {
        id: "do-lodo",
        label: "Do Lodo",
        description:
          "Exu do Lodo — verde escuro e preto, natureza sombria, lama e encruzilhadas.",
        promptKeywords:
          "swamp exu sacred attire, dark forest green and black formal outfit, mossy textured fabric, nature spirit aesthetic, dark green suit with black accents and trim, mystical swamp crossroads sacred Umbanda fashion",
        suggestedColors: ["verde", "preto"],
        clothingGender: "masculino",
      },
    ],
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
