import { mockDeep } from "jest-mock-extended";
import { Context } from "src/context";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
jest.mock("src/context", () => ({
  __esModule: true,
  default: mockDeep<Context>(),
}));

export const createContextMock = () => {
  return {
    request: mockDeep<Request>(),
    response: mockDeep<Response>(),
    prisma: mockDeep<PrismaClient>(),
    select: mockDeep<any>(),
  };
};

export type CreateContextMock = ReturnType<typeof createContextMock>;

export const mockedContext = createContextMock();
