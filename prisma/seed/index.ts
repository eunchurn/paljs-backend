import { Command } from "commander";

const program = new Command();

program
  .version("0.0.1")
  .description("Prisma seed local DB, default: seeding all data")
  .option("-n, --name <name>", "Seed selected table name")
  .option("-l, --list", "List seed table name")
  .option("-a, --all", "Seed all")
  .parse();

const opts = program.opts();

type SeedProps = { name?: string; list?: boolean; all?: boolean };

async function seeding({ name, list, all }: SeedProps) {
  const seed = await import("./data");
  const seedTableKeys = Object.keys(seed);
  type SeedKeys = keyof typeof seed;
  if (list) {
    console.log("== list of seed table ==");
    console.log(seedTableKeys);
    return;
  }
  if (name) {
    const { PrismaClient } = await import("@prisma/client");
    const prisma = new PrismaClient({ log: ["query", "error"] });
    if (!seedTableKeys.includes(name)) {
      throw new Error(
        `There is no seed table name such as '${name}'. Check seed name by using "seed --list"`,
      );
    }
    console.log(`== seeding ${name} table ==`);
    const result = await seed[name as SeedKeys](prisma).finally(async () => {
      await prisma.$disconnect();
    });
    console.log(result);
    return;
  }
  console.log("== seeding all data ==");
  const { PrismaClient } = await import("@prisma/client");
  const prisma = new PrismaClient({ log: ["query", "error"] });
  for await (const tableKey of seedTableKeys) {
    const result = await seed[tableKey as SeedKeys](prisma);
    console.log(result);
  }
  await prisma.$disconnect();
  return;
}

seeding(opts);
