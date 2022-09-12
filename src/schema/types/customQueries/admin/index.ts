import { enumType, objectType, queryField } from "nexus";
import { NexusGenObjects } from "src/generated/resolverTypes";

const getSchema = queryField("getSchema", {
  type: "Schema",
  async resolve(_root, _args, { prisma }) {
    const recentSchema = await prisma.adminSchema.findFirst({
      orderBy: { createdAt: "desc" },
    });
    if (!recentSchema) throw new Error("No schema");
    const { schema } = recentSchema;
    return schema as NexusGenObjects["Schema"];
  },
});

const Schema = objectType({
  name: "Schema",
  definition(t) {
    t.nonNull.list.nonNull.field("enums", { type: SchemaEnum });
    t.nonNull.list.nonNull.field("models", { type: SchemaModel });
  },
});

const SchemaEnum = objectType({
  name: "Enum",
  definition(t) {
    t.nonNull.list.nonNull.string("fields");
    t.nonNull.string("name");
  },
});

const SchemaKindEnum = enumType({
  name: "KindEnum",
  members: ["enum", "object", "scalar"],
});

const SchemaField = objectType({
  name: "Field",
  definition(t) {
    t.nonNull.boolean("create");
    t.nonNull.boolean("editor");
    t.nonNull.boolean("filter");
    t.nonNull.string("id");
    t.nonNull.boolean("isId");
    t.nonNull.field("kind", { type: SchemaKindEnum });
    t.nonNull.boolean("list");
    t.nonNull.string("name");
    t.nonNull.int("order");
    t.nonNull.boolean("read");
    t.boolean("relationField");
    t.nonNull.boolean("required");
    t.nonNull.boolean("sort");
    t.nonNull.string("title");
    t.nonNull.string("type");
    t.nonNull.boolean("unique");
    t.nonNull.boolean("update");
    t.nonNull.boolean("upload");
  },
});

const SchemaModel = objectType({
  name: "Model",
  definition(t) {
    t.nonNull.boolean("create");
    t.nonNull.boolean("delete");
    t.nonNull.list.nonNull.string("displayFields");
    t.nonNull.list.nonNull.field("fields", { type: SchemaField });
    t.nonNull.string("id");
    t.nonNull.string("idField");
    t.nonNull.string("name");
    t.nonNull.boolean("update");
  },
});

const exportModules = (() => {
  if (process.env.GENERATE_ADMIN !== "true") {
    return {
      getSchema,
      Schema,
      SchemaEnum,
      SchemaKindEnum,
      SchemaField,
      SchemaModel,
    };
  }
  return {};
})();

module.exports = exportModules;
