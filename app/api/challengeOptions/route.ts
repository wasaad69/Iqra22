import db from "@/db/drizzle";
import { challengeOptions, challenges } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq, ilike, and } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const text = searchParams.get("text");
  const challengeId = searchParams.get("challengeId");
  const challengeQuestion = searchParams.get("challengeQuestion");

  const filters = [];

  if (text) {
    filters.push(ilike(challengeOptions.text, `%${text}%`));
  }

  if (challengeId) {
    filters.push(eq(challengeOptions.challengeId, Number(challengeId)));
  }

  if (challengeQuestion) {
    filters.push(ilike(challenges.question, `%${challengeQuestion}%`));
  }

  const data = await db
    .select()
    .from(challengeOptions)
    .innerJoin(challenges, eq(challengeOptions.challengeId, challenges.id))
    .where(filters.length ? and(...filters) : undefined);

  // Flatten the joined data for React Admin
  const flattened = data.map((row) => ({
    ...row.challengeOptions,
    challenge: row.challenges, // include challenge.question if you want
  }));

  return NextResponse.json(flattened);
}
