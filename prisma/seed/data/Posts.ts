import { PrismaClient } from "@prisma/client";
import Chance from "chance";

const chance = new Chance();

export async function Posts(prisma: PrismaClient) {
  const post = await prisma.post.create({
    data: {
      title: chance.sentence({ words: 3 }),
      content: chance.sentence({ words: 20 }),
      author: { connect: { email: "eunchurn.park@gmail.com" } },
    },
  });
  return post;
}
