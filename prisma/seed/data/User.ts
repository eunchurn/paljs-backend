import { PrismaClient } from "@prisma/client";

export async function User(prisma: PrismaClient) {
  const user = await prisma.user.upsert({
    where: { email: "eunchurn.park@gmail.com" },
    create: {
      name: "Eunchurn Park",
      email: "eunchurn.park@gmail.com",
    },
    update: {
      name: "Eunchurn Park",
      email: "eunchurn.park@gmail.com",
    },
  });
  return user;
}
