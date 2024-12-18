import { PrismaClient } from '@prisma/client';
import {
  deleteDoppelgangerClientGenerationForTest,
  deleteDoppelgangerHealthReportGenerationForTest,
  doppelgangerClientGenerationForTest,
  doppelgangerHealthReportGenerationForTest,
} from '@prisma/client/sql';
import { doppelgangerDetectionFN } from './doppelgangerDetection';

describe('doppelgangerDetection', () => {
  beforeAll(async () => {
    const prisma = new PrismaClient();

    await prisma.$queryRawTyped(doppelgangerClientGenerationForTest());
    await prisma.$queryRawTyped(doppelgangerHealthReportGenerationForTest());
  });
  afterAll(async () => {
    const prisma = new PrismaClient();
    await prisma.$queryRawTyped(deleteDoppelgangerClientGenerationForTest());
    await prisma.$queryRawTyped(
      deleteDoppelgangerHealthReportGenerationForTest(),
    );
  });

  it('should return an array of doppelganger IDs', async () => {
    const result = await doppelgangerDetectionFN();

    expect(result).toEqual([
      { id: 100 },
      { id: 101 },
      { id: 105 },
      { id: 107 },
    ]);
  });
});
