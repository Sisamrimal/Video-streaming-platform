import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

// create prisma instance
const createPrismaClient = () =>
  new PrismaClient({
    adapter,
  });

// extend global type safely
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const db =
  global.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = db;
}
