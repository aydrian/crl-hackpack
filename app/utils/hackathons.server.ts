import type { Prisma } from "@prisma/client";

import { z } from "zod";

import { prisma } from "~/utils/db.server.ts";

export const ParamsSchema = z.object({
  hackathonSlug: z.string().optional()
});

export async function findBySlug<T extends Prisma.HackathonSelect>(
  slug: string | undefined,
  select: T
) {
  if (!slug) {
    return null;
  }
  const hackathon = await prisma.hackathon
    .findUniqueOrThrow({
      select,
      where: { slug }
    })
    .catch((err) => {
      console.error(err);
      throw new Response(null, { status: 404, statusText: "Not Found" });
    });
  return hackathon;
}

export async function findCurrent<T extends Prisma.HackathonSelect>(
  select: T,
  variance: number | undefined = 0
) {
  const lower = new Date();
  lower.setDate(lower.getDate() + variance);
  const upper = new Date();
  upper.setDate(upper.getDate() - variance);

  const hackathon = await prisma.hackathon.findFirst({
    select,
    where: {
      AND: [{ startDate: { lte: lower } }, { endDate: { gte: upper } }]
    }
  });
  console.log({ hackathon, lower, upper });
  return hackathon;
}
