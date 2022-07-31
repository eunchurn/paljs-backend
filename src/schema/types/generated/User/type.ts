import { objectType } from "nexus";

export const User = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: "User",
  description: `사용자`,
  definition(t) {
    t.string("id");
    t.string("name");
    t.list.field("posts", {
      type: "Post",
      args: {
        where: "PostWhereInput",
        orderBy: "PostOrderByWithRelationInput",
        cursor: "PostWhereUniqueInput",
        take: "Int",
        skip: "Int",
        distinct: "PostScalarFieldEnum",
      },
      resolve(root: any) {
        return root.posts;
      },
    });
    t.field("_count", {
      type: "UserCountOutputType",
      resolve(root: any) {
        return root._count;
      },
    });
  },
});
