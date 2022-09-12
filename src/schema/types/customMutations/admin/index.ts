import { mutationField, inputObjectType, stringArg, nonNull } from "nexus";
import { CustomAsyncAdapter, getLowWithLodash } from "./adapter";
import { NexusGenObjects } from "src/generated/resolverTypes";

const UpdateFieldInput = inputObjectType({
  name: "UpdateFieldInput",
  definition(t) {
    t.boolean("create");
    t.boolean("editor");
    t.boolean("filter");
    t.string("id");
    t.boolean("isId");
    t.field("kind", { type: "KindEnum" });
    t.boolean("list");
    t.string("name");
    t.int("order");
    t.boolean("read");
    t.boolean("relationField");
    t.boolean("required");
    t.boolean("sort");
    t.string("title");
    t.string("type");
    t.boolean("unique");
    t.boolean("update");
  },
});

const UpdateModelInput = inputObjectType({
  name: "UpdateModelInput",
  definition(t) {
    t.boolean("create");
    t.boolean("delete");
    t.list.string("displayFields");
    t.list.field("fields", { type: UpdateFieldInput });
    t.string("idField");
    t.string("name");
    t.boolean("update");
  },
});

const updateField = mutationField("updateField", {
  type: "Field",
  args: {
    data: UpdateFieldInput,
    id: nonNull(stringArg()),
    modelId: nonNull(stringArg()),
  },
  async resolve(_root, { data, id, modelId }, { prisma }) {
    const adapter = new CustomAsyncAdapter<NexusGenObjects["Schema"]>(prisma);
    const LowWithLodash = await getLowWithLodash();
    const db = new LowWithLodash(adapter);
    await db.read();
    const result = db.chain
      .get("models")
      .find({ id: modelId })
      .get("fields")
      .find({ id })
      .assign(data)
      .value();
    await db.write();
    return result;
  },
});

const updateModel = mutationField("updateModel", {
  type: "Model",
  args: { data: UpdateModelInput, id: nonNull(stringArg()) },
  async resolve(_root, { data, id }, { prisma }) {
    const adapter = new CustomAsyncAdapter<NexusGenObjects["Schema"]>(prisma);
    const LowWithLodash = await getLowWithLodash();
    const db = new LowWithLodash(adapter);
    await db.read();
    const result = db.chain.get("models").find({ id }).assign(data).value();
    await db.write();
    return result;
  },
});

const exportModules = (() => {
  if (process.env.GENERATE_ADMIN !== "true") {
    return {
      UpdateFieldInput,
      UpdateModelInput,
      updateField,
      updateModel,
    };
  }
  return {};
})();

module.exports = exportModules;
