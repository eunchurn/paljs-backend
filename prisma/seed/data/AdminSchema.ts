import { PrismaClient } from "@prisma/client";
import schema from "../../../adminSettings.json";

export async function AdminSchema(prisma: PrismaClient) {
  try {
    const result = await prisma.adminSchema.create({
      data: { schema },
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}
