import { ApolloServer } from "apollo-server-express";
import express from "express";
import { schema } from "./schema";
import { context } from "./context";

const port = process.env.PORT || "8000";

const app = express();
app.use(express.json());
app.disable("x-powered-by");

const server = new ApolloServer({
  schema,
  context,
  introspection: process.env.NODE_ENV !== "production",
  csrfPrevention: true,
  cache: "bounded",
});

export async function runServer() {
  await server.start();
  server.applyMiddleware({ app, path: "/" });
  await new Promise<void>((resolve) => app.listen(Number(port), resolve));
  console.log(
    `🚀 GraphQL service ready at http://localhost:${port}${server.graphqlPath}`,
  );
}
