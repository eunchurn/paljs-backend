import { mutationField, nonNull } from "nexus";

export const AdminSchemaCreateOneMutation = mutationField(
  "createOneAdminSchema",
  {
    type: nonNull("AdminSchema"),
    args: {
      data: nonNull("AdminSchemaCreateInput"),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.adminSchema.create({
        data,
        ...select,
      });
    },
  },
);
