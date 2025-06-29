
import axios from "axios";

const HF_API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

export async function getEmbedding(text: string): Promise<number[]> {
  const response = await axios.post(
    "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2",
    [text],
    {
      headers: {
        Authorization: `Bearer ${HF_API_TOKEN}`,
      },
    }
  );
  // API returns [ [ embedding array ] ], we want first element
  return response.data[0];
}
