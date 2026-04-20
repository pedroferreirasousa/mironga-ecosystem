import Replicate from "replicate";
import { NextRequest, NextResponse } from "next/server";

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

/**
 * Builds a highly specific prompt for sacred Afro-Brazilian fashion.
 * Entity-specific language ensures Pombagira = ballgown, Exu = formal suit/cape.
 */
function buildPrompt(body: {
  entityId: string;
  entityLabel: string;
  styleLabel: string;
  styleKeywords: string;
  fabric: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  description: string;
}) {
  const isPombagira = body.entityId === "pombagira";

  const base = [
    "same person, same face, same hairstyle, same skin tone, same background",
    "ONLY replace the clothing with:",
  ];

  const clothingDesc = isPombagira
    ? [
        `sacred Pombagira ${body.styleLabel} ritual gown`,
        body.styleKeywords,
        `made of ${body.fabric}`,
        `primary color ${body.primaryColor}`,
        body.secondaryColor ? `secondary color ${body.secondaryColor}` : "",
        body.accentColor ? `${body.accentColor} embroidery beadwork and trim details` : "",
        body.description || "",
        "voluminous theatrical ball gown, multiple ruffled layers, artisanal handcrafted",
        "sacred Umbanda Candomblé Brazilian spiritual ritual fashion",
        "full body shot, high quality dramatic fashion photograph, studio lighting",
      ]
    : [
        `powerful Exu ${body.styleLabel} sacred ritual outfit`,
        body.styleKeywords,
        `made of ${body.fabric}`,
        `primary color ${body.primaryColor}`,
        body.secondaryColor ? `with ${body.secondaryColor} accent details` : "",
        body.accentColor ? `${body.accentColor} trim and embroidery` : "",
        body.description || "",
        "formal sacred attire, artisanal handcrafted",
        "sacred Umbanda Quimbanda Brazilian spiritual ritual fashion",
        "full body shot, high quality dramatic fashion photograph, studio lighting",
      ];

  return [...base, ...clothingDesc].filter(Boolean).join(", ");
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

    const entityId      = (formData.get("entityId")      as string) || "pombagira";
    const entityLabel   = (formData.get("entityLabel")   as string) || "Pombagira";
    const styleLabel    = (formData.get("styleLabel")    as string) || "";
    const styleKeywords = (formData.get("styleKeywords") as string) || "";
    const fabric        = (formData.get("fabric")        as string) || "cetim";
    const primaryColor  = (formData.get("primaryColor")  as string) || "vermelho";
    const secondaryColor= (formData.get("secondaryColor")as string) || "";
    const accentColor   = (formData.get("accentColor")   as string) || "";
    const description   = (formData.get("description")   as string) || "";

    const prompt = buildPrompt({
      entityId, entityLabel, styleLabel, styleKeywords,
      fabric, primaryColor, secondaryColor, accentColor, description,
    });

    // Convert photo to base64 data URI for Replicate
    const photoBuffer  = await photoFile.arrayBuffer();
    const photoBase64  = Buffer.from(photoBuffer).toString("base64");
    const photoDataUri = `data:${photoFile.type || "image/jpeg"};base64,${photoBase64}`;

    // FLUX.1-dev img2img
    // strength 0.75 — enough to fully replace clothing while preserving face/body
    const output = await replicate.run(
      "black-forest-labs/flux-dev",
      {
        input: {
          prompt,
          image: photoDataUri,
          strength: 0.75,
          num_inference_steps: 35,
          guidance: 4,
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
