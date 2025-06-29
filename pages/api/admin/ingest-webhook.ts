
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/db";
import { getEmbedding } from "../../../lib/embedding";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { fileId, filename, source, uploadedById, content } = req.body;

  if (!fileId || !filename || !source || !uploadedById || !content) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  // Check if file already embedded
  const existingFile = await prisma.file.findUnique({ where: { sourceId: fileId } });
  if (existingFile && existingFile.embedded) {
    return res.status(200).json({ message: "File already embedded" });
  }

  // Create or update file entry
  const file = await prisma.file.upsert({
    where: { sourceId: fileId },
    update: { filename, embedded: false, uploadedById },
    create: { filename, source, sourceId: fileId, uploadedById },
  });

  // Generate embedding (for demo, embedding whole content at once, chunking can be added)
  const embedding = await getEmbedding(content);

  // Store embedding vector in pgvector
  // Note: You'll need a separate vector table or JSON column for embeddings in production
  // For demo, just mark file embedded
  await prisma.file.update({
    where: { id: file.id },
    data: { embedded: true },
  });

  res.status(200).json({ message: "File ingested and embedded", fileId });
}
