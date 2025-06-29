
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/db";
import { verifyToken } from "../../../lib/jwt";
import { getEmbedding } from "../../../lib/embedding";
import axios from "axios";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  const user = verifyToken(token);

  if (!user || user.role !== "USER") {
    return res.status(403).json({ error: "Forbidden" });
  }

  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: "Missing query" });
  }

  // Enforce query limits per user plan (reset daily, simplified here)
  const dbUser = await prisma.user.findUnique({ where: { id: user.id }, include: { plan: true } });
  if (!dbUser || !dbUser.plan) {
    return res.status(403).json({ error: "User or plan not found" });
  }

  if (dbUser.queriesUsed >= dbUser.plan.maxQueriesPerDay) {
    return res.status(429).json({ error: "Query limit exceeded" });
  }

  // Get query embedding
  const queryEmbedding = await getEmbedding(query);

  // TODO: Retrieve top-k similar docs using pgvector similarity search - placeholder below
  // For demo, returning fixed response
  const fakeAnswer = "This is a stub answer. Integrate pgvector similarity search here.";

  // Update user's queriesUsed count
  await prisma.user.update({
    where: { id: user.id },
    data: { queriesUsed: dbUser.queriesUsed + 1 },
  });

  res.status(200).json({ answer: fakeAnswer });
}
