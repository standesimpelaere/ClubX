import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

export const PrismaClientExtended = new PrismaClient().$extends(withAccelerate());

export { PrismaClient } from '@prisma/client';
export * from '@prisma/client';
