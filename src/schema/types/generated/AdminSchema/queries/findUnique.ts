import { queryField, nonNull } from "nexus";

export const AdminSchemaFindUniqueQuery = queryField("findUniqueAdminSchema", {
  type: "AdminSchema",
  args: {
    where: nonNull("AdminSchemaWhereUniqueInput"),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.adminSchema.findUnique({
      where,
      ...select,
    });
  },
});
