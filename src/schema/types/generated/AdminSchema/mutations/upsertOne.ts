import { mutationField, nonNull } from "nexus";

export const AdminSchemaUpsertOneMutation = mutationField(
  "upsertOneAdminSchema",
  {
    type: nonNull("AdminSchema"),
    args: {
      where: nonNull("AdminSchemaWhereUniqueInput"),
      create: nonNull("AdminSchemaCreateInput"),
      update: nonNull("AdminSchemaUpdateInput"),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.adminSchema.upsert({
        ...args,
        ...select,
      });
    },
  },
);
