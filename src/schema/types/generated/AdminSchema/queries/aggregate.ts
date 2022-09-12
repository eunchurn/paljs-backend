import { queryField, list } from "nexus";

export const AdminSchemaAggregateQuery = queryField("aggregateAdminSchema", {
  type: "AggregateAdminSchema",
  args: {
    where: "AdminSchemaWhereInput",
    orderBy: list("AdminSchemaOrderByWithRelationInput"),
    cursor: "AdminSchemaWhereUniqueInput",
    take: "Int",
    skip: "Int",
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.adminSchema.aggregate({ ...args, ...select }) as any;
  },
});
