import { PrismaClient } from '@prisma/client';
import { doppelgangerDetection } from '@prisma/client/sql';

export async function doppelgangerDetectionFN() {
  const prisma = new PrismaClient();

  const doppelgangerIDs = await prisma.$queryRawTyped(doppelgangerDetection());

  return doppelgangerIDs;
}
