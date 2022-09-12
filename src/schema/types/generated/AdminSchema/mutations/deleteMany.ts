import { mutationField, nonNull } from "nexus";

export const AdminSchemaDeleteManyMutation = mutationField(
  "deleteManyAdminSchema",
  {
    type: nonNull("BatchPayload"),
    args: {
      where: "AdminSchemaWhereInput",
    },
    resolve: async (_parent, { where }, { prisma }) => {
      return prisma.adminSchema.deleteMany({ where } as any);
    },
  },
);
