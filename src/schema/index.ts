import "../moduleAliases";
import {
  makeSchema,
  fieldAuthorizePlugin,
  declarativeWrappingPlugin,
} from "nexus";
import { SchemaConfig } from "nexus/dist/builder";
import { nexusShield, allow } from "nexus-shield";
import { ForbiddenError } from "apollo-server-core";
import * as types from "./types";
import { paljs } from "@paljs/nexus";
import path from "path";

const option: SchemaConfig = {
  types,
  shouldGenerateArtifacts: true,
  plugins: [
    nexusShield({
      defaultError: new ForbiddenError("Not allowed"),
      defaultRule: allow,
    }),
    paljs({
      includeAdmin: true,
    }),
    declarativeWrappingPlugin(),
    fieldAuthorizePlugin({
      formatError: ({ error }) => {
        console.log(error);
        return error;
      },
    }),
  ],
  sourceTypes: {
    modules: [
      {
        module: "@prisma/client",
        alias: "prisma",
      },
    ],
  },
  contextType: {
    module: require.resolve("../context"),
    export: "Context",
  },
  outputs: {
    typegen: path.resolve(__dirname, "../generated/resolverTypes.ts"),
    schema: path.resolve(__dirname, "../generated/schema.graphql"),
  },
};

export const schema = makeSchema(option);
