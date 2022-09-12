import { dynamicImport } from "tsimportlib";

async function runDelete() {
  const del = (await dynamicImport("del", module)) as typeof import("del");
  const path = "src/schema/types/generated/**/index.ts";
  del
    .deleteAsync([path])
    .then((files) =>
      console.log(`✔ ${files.length} generated 'index.ts' files deleted`),
    );
}

runDelete();
