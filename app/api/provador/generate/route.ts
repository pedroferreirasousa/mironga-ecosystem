import Replicate from "replicate";
import { NextRequest, NextResponse } from "next/server";

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

/**
 * Builds a prompt for sacred Afro-Brazilian fashion.
 * The clothing description leads the prompt (FLUX weights the start most heavily).
 * Works for any entity — Pombagira, Exu, Caboclo, Marinheiro, Boiadeiro, etc.
 */
function buildPrompt(body: {
  styleLabel: string;
  styleKeywords: string;
  fabric: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  description: string;
}) {
  const colorDesc = [
    body.primaryColor,
    body.secondaryColor ? `and ${body.secondaryColor}` : "",
    body.accentColor ? `with ${body.accentColor} embroidery and trim details` : "",
  ].filter(Boolean).join(" ");

  const userNote = body.description ? `, ${body.description}` : "";

  return [
    // Clothing leads — FLUX weights the beginning of the prompt most
    `fashion photograph of a person wearing a complete ${colorDesc} ${body.fabric} ${body.styleLabel} sacred ritual outfit`,
    body.styleKeywords,
    `complete full-body outfit covering from shoulders all the way down to feet${userNote}`,
    "artisanal handcrafted sacred garment, full body visible from head to toe",
    "sacred Afro-Brazilian ritual fashion, Umbanda Candomblé Quimbanda tradition",
    "full body portrait fashion photo, dramatic studio lighting, high resolution",
    // Identity anchor at the end
    "same face, same hairstyle, same skin tone as input photo",
  ].filter(Boolean).join(", ");
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

    const styleLabel    = (formData.get("styleLabel")    as string) || "";
    const styleKeywords = (formData.get("styleKeywords") as string) || "";
    const fabric        = (formData.get("fabric")        as string) || "cetim";
    const primaryColor  = (formData.get("primaryColor")  as string) || "vermelho";
    const secondaryColor= (formData.get("secondaryColor")as string) || "";
    const accentColor   = (formData.get("accentColor")   as string) || "";
    const description   = (formData.get("description")   as string) || "";

    const prompt = buildPrompt({
      styleLabel, styleKeywords,
      fabric, primaryColor, secondaryColor, accentColor, description,
    });

    // Convert photo to base64 data URI for Replicate
    const photoBuffer  = await photoFile.arrayBuffer();
    const photoBase64  = Buffer.from(photoBuffer).toString("base64");
    const photoDataUri = `data:${photoFile.type || "image/jpeg"};base64,${photoBase64}`;

    // FLUX.1-dev img2img via Replicate
    // prompt_strength 0.92 = almost completely replaces clothing while keeping composition
    // guidance 7 = strong adherence to prompt for full outfit coverage
    const output = await replicate.run(
      "black-forest-labs/flux-dev",
      {
        input: {
          prompt,
          image:            photoDataUri,
          prompt_strength:  0.92,
          num_inference_steps: 50,
          guidance:         7,
          output_format:    "webp",
          output_quality:   95,
        },
      }
    );

    const imageUrl = Array.isArray(output) ? String(output[0]) : String(output);

    // Fetch and convert to base64 to return to client
    const imgRes    = await fetch(imageUrl);
    const imgBuffer = await imgRes.arrayBuffer();
    const mimeType  = imgRes.headers.get("content-type") || "image/webp";
    const base64    = Buffer.from(imgBuffer).toString("base64");

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
