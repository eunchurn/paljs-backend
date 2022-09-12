import { mutationField, nonNull } from "nexus";

export const AdminSchemaDeleteOneMutation = mutationField(
  "deleteOneAdminSchema",
  {
    type: "AdminSchema",
    args: {
      where: nonNull("AdminSchemaWhereUniqueInput"),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.adminSchema.delete({
        where,
        ...select,
      });
    },
  },
);
