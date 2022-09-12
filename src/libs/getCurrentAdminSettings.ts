import { PrismaClient } from "@prisma/client";
import prisma from "./prisma/client";
import fs from "fs";
import path from "path";

async function getCurrentAdminSettings(prisma: PrismaClient) {
  try {
    const adminSettings = await prisma.adminSchema.findFirst({
      orderBy: { createdAt: "desc" },
    });
    if (!adminSettings) {
      console.log("No adminSettings in DB. creating...");
      const schemaString = fs
        .readFileSync(path.resolve(__dirname, "../../adminSettings.json"))
        .toString();
      const schema = JSON.parse(schemaString);
      await prisma.adminSchema.create({ data: { schema } });
      return;
    }
    fs.writeFileSync(
      path.resolve(__dirname, "../../adminSettings.json"),
      JSON.stringify(adminSettings.schema, null, 2),
    );
  } catch (e) {
    console.log(e);
  }
}

getCurrentAdminSettings(prisma);
