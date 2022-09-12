import { PrismaClient } from "@prisma/client";
import { cleanup } from "./cleanup";

interface DataBaseUrlObj {
  dbClusterIdentifier: string;
  password: string;
  dbname: string;
  engine: string;
  port: string;
  host: string;
  username: string;
}

/* A function that returns a database url. */
const databaseUrl = (() => {
  try {
    if (!process.env.APIDATABASE_SECRET) return process.env.DATABASE_URL;
    const databaseUrlObj = JSON.parse(
      process.env.APIDATABASE_SECRET,
    ) as unknown as DataBaseUrlObj;
    const { engine, username, password, host, port, dbname } = databaseUrlObj;
    const url = `${engine}://${username}:${password}@${host}:${port}/${dbname}?schema=public&connection_limit=5`;
    return url;
  } catch (e) {
    console.log(e);
    return process.env.DATABASE_URL;
  }
})();

/* Creating a new instance of the PrismaClient. */
const prisma = new PrismaClient({
  datasources: { db: { url: databaseUrl } },
});

cleanup({ prisma });

export default prisma;
