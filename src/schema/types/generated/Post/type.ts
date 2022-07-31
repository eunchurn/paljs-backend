import { objectType } from "nexus";

export const Post = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: "Post",
  description: `포스트`,
  definition(t) {
    t.string("id");
    t.string("title");
    t.string("content");
    t.nullable.field("author", {
      type: "User",
      resolve(root: any) {
        return root.author;
      },
    });
    t.nullable.string("authorId");
  },
});
