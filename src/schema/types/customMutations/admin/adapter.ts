import { dynamicImport } from "tsimportlib";
import { PrismaClient, Prisma } from "@prisma/client";
import { chain, ExpChain } from "lodash";

export class CustomAsyncAdapter<T extends Prisma.InputJsonValue> {
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
  prisma: PrismaClient;
  async read() {
    const currentSchema = await this.prisma.adminSchema.findFirst({
      orderBy: { createdAt: "desc" },
    });
    if (!currentSchema) throw new Error("No schema found in DB");
    return currentSchema.schema as T;
  }
  async write(schema: T) {
    await this.prisma.adminSchema.create({ data: { schema } });
  }
}

export async function getLowWithLodash() {
  const { Low } = (await dynamicImport(
    "lowdb",
    module,
  )) as typeof import("lowdb");
  return class LowWithLodash<T> extends Low<T> {
    chain: ExpChain<this["data"]> = chain(this).get("data");
  };
}
