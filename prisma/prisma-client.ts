import { PrismaClient } from "@prisma/client";

// prevents hot reloading from spinning up more instances
declare global {
  var prisma: PrismaClient | undefined;
}

const db = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === "development") global.prisma = db;

export default db;
