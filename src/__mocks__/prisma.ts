import { PrismaClient } from "@prisma/client";
import {
  mockDeep,
  mockReset,
  MockProxy,
  DeepMockProxy,
} from "jest-mock-extended";
import prisma from "libs/prisma/client";

jest.mock("libs/prisma/client", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

const prismaMock = prisma as unknown as MockProxy<PrismaClient>;

beforeEach(() => {
  mockReset(prismaMock);
});

export type PrismaMock = DeepMockProxy<PrismaClient>;

export default prismaMock as unknown as PrismaMock;
