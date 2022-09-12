import { mutationField, nonNull } from "nexus";

export const AdminSchemaUpdateOneMutation = mutationField(
  "updateOneAdminSchema",
  {
    type: nonNull("AdminSchema"),
    args: {
      data: nonNull("AdminSchemaUpdateInput"),
      where: nonNull("AdminSchemaWhereUniqueInput"),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.adminSchema.update({
        where,
        data,
        ...select,
      });
    },
  },
);
