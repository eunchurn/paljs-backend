import { ExpressContext } from "apollo-server-express";
import { Request, Response } from "express";
import prisma from "libs/prisma/client";
import { PrismaClient } from "@prisma/client";

export interface Context {
  request: Request;
  response: Response;
  prisma: PrismaClient;
  select: any;
}

export async function context({ req, res }: ExpressContext): Promise<Context> {
  return { request: req, response: res, prisma, select: null };
}
