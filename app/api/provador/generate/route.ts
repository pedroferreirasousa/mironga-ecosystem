import { HfInference } from "@huggingface/inference";
import { NextRequest, NextResponse } from "next/server";

const hf = new HfInference(process.env.HF_TOKEN);

/**
 * Builds a descriptive prompt from the user's selections.
 * The prompt instructs the model to keep the person's face and generate
 * new clothing matching the description.
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
    `same person, same face, same background`,
    `wearing a ${body.style} style ${body.clothingType}`,
    `made of ${body.fabric} fabric`,
    `primarily ${body.primaryColor}`,
    body.secondaryColor ? `with ${body.secondaryColor} accents` : "",
    body.accentColor ? `and ${body.accentColor} details` : "",
    body.description ? body.description : "",
    `high quality fashion photo, full body, natural lighting`,
    `Brazilian artisanal fashion, detailed textile work`,
  ]
    .filter(Boolean)
    .join(", ");

  return parts;
}

const NEGATIVE_PROMPT =
  "deformed, blurry, bad anatomy, different face, face swap, distorted limbs, extra limbs, cloned face, duplicate, nude";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const photoFile = formData.get("photo") as File | null;

    if (!photoFile) {
      return NextResponse.json({ error: "Foto não enviada." }, { status: 400 });
    }

    const clothingType  = (formData.get("clothingType")  as string) || "top";
    const fabric        = (formData.get("fabric")        as string) || "cotton";
    const style         = (formData.get("style")         as string) || "casual";
    const primaryColor  = (formData.get("primaryColor")  as string) || "white";
    const secondaryColor= (formData.get("secondaryColor")as string) || "";
    const accentColor   = (formData.get("accentColor")   as string) || "";
    const description   = (formData.get("description")   as string) || "";

    const prompt = buildPrompt({
      clothingType, fabric, style,
      primaryColor, secondaryColor, accentColor, description,
    });

    // Convert the uploaded photo to ArrayBuffer for HF
    const photoBuffer = await photoFile.arrayBuffer();
    const photoBlob = new Blob([photoBuffer], { type: photoFile.type });

    // Use SDXL img2img via HuggingFace Inference API.
    // strength: 0.55 — keeps the person's structure / face while regenerating clothes.
    // For production, swap to a dedicated virtual try-on model (e.g. IDM-VTON).
    const result = await hf.imageToImage({
      model: "timbrooks/instruct-pix2pix",
      inputs: photoBlob,
      parameters: {
        prompt: `[REPLACE CLOTHING ONLY] ${prompt}`,
        negative_prompt: NEGATIVE_PROMPT,
        num_inference_steps: 20,
        image_guidance_scale: 1.5,
        guidance_scale: 7,
      },
    });

    const resultBuffer = await result.arrayBuffer();
    const base64 = Buffer.from(resultBuffer).toString("base64");
    const mimeType = result.type || "image/png";

    return NextResponse.json({ image: `data:${mimeType};base64,${base64}`, prompt });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro ao gerar imagem.";
    console.error("[provador/generate]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
