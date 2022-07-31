import { extendType } from "nexus";

export const referredBlog = extendType({
  type: "Post",
  definition(t) {
    t.list.string("referredBlogs", {
      async resolve({ id }) {
        const referredBlogsUrls = await findReferredBlogs(id);
        return referredBlogsUrls;
      },
    });
  },
});

async function findReferredBlogs(id: string) {
  const fakeData = [
    "https://www.eunchurn.com/blog/development/2022-07-03-tWIL",
    "https://www.eunchurn.com/blog/development/2022-07-10-tWIL",
  ];
  return fakeData;
}
