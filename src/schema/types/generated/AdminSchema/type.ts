import { objectType } from "nexus";

export const AdminSchema = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: "AdminSchema",
  description: `어드민 Schema`,
  definition(t) {
    t.int("id", { description: `ID String CUID` });
    t.field("createdAt", { description: "createdAt", type: "DateTime" });
    t.field("updatedAt", { description: "updatedAt", type: "DateTime" });
    t.json("schema", { description: `Schema` });
  },
});
