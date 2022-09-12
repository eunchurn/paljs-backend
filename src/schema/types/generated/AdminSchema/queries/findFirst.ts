import { queryField, list } from "nexus";

export const AdminSchemaFindFirstQuery = queryField("findFirstAdminSchema", {
  type: "AdminSchema",
  args: {
    where: "AdminSchemaWhereInput",
    orderBy: list("AdminSchemaOrderByWithRelationInput"),
    cursor: "AdminSchemaWhereUniqueInput",
    take: "Int",
    skip: "Int",
    distinct: list("AdminSchemaScalarFieldEnum"),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.adminSchema.findFirst({
      ...args,
      ...select,
    });
  },
});
