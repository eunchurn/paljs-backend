import { ExpressContext } from "apollo-server-express";

export interface Context {
  select: any;
}

export async function context({ req, res }: ExpressContext): Promise<Context> {
  return { select: null };
}
