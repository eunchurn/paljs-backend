import { queryField, nonNull, list } from "nexus";

export const AdminSchemaFindCountQuery = queryField(
  "findManyAdminSchemaCount",
  {
    type: nonNull("Int"),
    args: {
      where: "AdminSchemaWhereInput",
      orderBy: list("AdminSchemaOrderByWithRelationInput"),
      cursor: "AdminSchemaWhereUniqueInput",
      take: "Int",
      skip: "Int",
      distinct: list("AdminSchemaScalarFieldEnum"),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.adminSchema.count(args as any);
    },
  },
);
