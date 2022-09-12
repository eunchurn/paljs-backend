import { mutationField, nonNull } from "nexus";

export const AdminSchemaUpdateManyMutation = mutationField(
  "updateManyAdminSchema",
  {
    type: nonNull("BatchPayload"),
    args: {
      data: nonNull("AdminSchemaUpdateManyMutationInput"),
      where: "AdminSchemaWhereInput",
    },
    resolve(_parent, args, { prisma }) {
      return prisma.adminSchema.updateMany(args as any);
    },
  },
);
