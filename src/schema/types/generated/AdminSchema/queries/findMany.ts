import { queryField, nonNull, list } from "nexus";

export const AdminSchemaFindManyQuery = queryField("findManyAdminSchema", {
  type: nonNull(list(nonNull("AdminSchema"))),
  args: {
    where: "AdminSchemaWhereInput",
    orderBy: list("AdminSchemaOrderByWithRelationInput"),
    cursor: "AdminSchemaWhereUniqueInput",
    take: "Int",
    skip: "Int",
    distinct: list("AdminSchemaScalarFieldEnum"),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.adminSchema.findMany({
      ...args,
      ...select,
    });
  },
});
