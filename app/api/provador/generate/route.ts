import Replicate from "replicate";
import { NextRequest, NextResponse } from "next/server";

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

/**
 * Monta prompt focado em roupas de matriz africana (Candomblé, Umbanda,
 * Quimbanda, Jurema Sagrada, Macumba Carioca).
 * O modelo FLUX img2img mantém o rosto/corpo da pessoa e edita apenas a roupa.
 */
function buildPrompt(body: {
  clothingType: string;
  fabric: string;
  style: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  description: string;
}) {
  const parts = [
    "same person, same face, same body, same skin tone",
    `wearing a handcrafted ${body.clothingType}`,
    `inspired by ${body.style}, sacred Afro-Brazilian religious fashion`,
    `(Candomblé, Umbanda, Quimbanda, Jurema Sagrada traditions)`,
    `made of ${body.fabric}`,
    `primary color ${body.primaryColor}`,
    body.secondaryColor ? `with ${body.secondaryColor} accents` : "",
    body.accentColor ? `and ${body.accentColor} embroidery and beadwork` : "",
    body.description || "",
    "artisanal ateliê craftsmanship, ritual sacred garment, orixá ceremonial wear",
    "full body shot, high quality fashion photograph, natural studio lighting",
  ]
    .filter(Boolean)
    .join(", ");

  return parts;
}

export async function POST(req: NextRequest) {
  if (!process.env.REPLICATE_API_TOKEN) {
    return NextResponse.json(
      { error: "REPLICATE_API_TOKEN não configurado no servidor." },
      { status: 500 }
    );
  }

  try {
    const formData = await req.formData();
    const photoFile = formData.get("photo") as File | null;

    if (!photoFile) {
      return NextResponse.json({ error: "Foto não enviada." }, { status: 400 });
    }

    const clothingType   = (formData.get("clothingType")   as string) || "vestido";
    const fabric         = (formData.get("fabric")         as string) || "algodão";
    const style          = (formData.get("style")          as string) || "Oxum";
    const primaryColor   = (formData.get("primaryColor")   as string) || "dourado";
    const secondaryColor = (formData.get("secondaryColor") as string) || "";
    const accentColor    = (formData.get("accentColor")    as string) || "";
    const description    = (formData.get("description")    as string) || "";

    const prompt = buildPrompt({
      clothingType, fabric, style,
      primaryColor, secondaryColor, accentColor, description,
    });

    // Converte a foto para base64 data URI
    const photoBuffer = await photoFile.arrayBuffer();
    const photoBase64 = Buffer.from(photoBuffer).toString("base64");
    const photoDataUri = `data:${photoFile.type || "image/jpeg"};base64,${photoBase64}`;

    // FLUX.1-dev img2img via Replicate
    // strength 0.65 = muda a roupa mas preserva rosto/corpo/fundo
    const output = await replicate.run(
      "black-forest-labs/flux-dev",
      {
        input: {
          prompt,
          image: photoDataUri,
          strength: 0.65,
          num_inference_steps: 28,
          guidance: 3.5,
        },
      }
    );

    // output é um array com a URL da imagem gerada
    const imageUrl = Array.isArray(output) ? String(output[0]) : String(output);

    // Baixa a imagem e converte para base64 para retornar ao cliente
    const imgRes = await fetch(imageUrl);
    const imgBuffer = await imgRes.arrayBuffer();
    const mimeType = imgRes.headers.get("content-type") || "image/webp";
    const base64 = Buffer.from(imgBuffer).toString("base64");

    return NextResponse.json({
      image: `data:${mimeType};base64,${base64}`,
      prompt,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro ao gerar imagem.";
    console.error("[provador/generate]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
