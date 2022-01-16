import { Pool } from "pg";
import { postgraphile } from "postgraphile";
import { NodePlugin } from "graphile-build";
import { withSession, WithSessionProp } from "@clerk/nextjs/api";
import { NextApiRequest, NextApiResponse } from "next";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
});

const runPostgraphile = (
  req: WithSessionProp<NextApiRequest>,
  res: NextApiResponse
) => {
  return new Promise((resolve, reject) => {
    const hasSession = req?.session;

    const schema = process.env.DB_SCHEMA ?? "public";

    postgraphile(pool, schema, {
      subscriptions: false,
      watchPg: false,
      dynamicJson: true,
      setofFunctionsContainNulls: false,
      ignoreRBAC: false,
      showErrorStack: "json",
      extendedErrors: ["hint", "detail", "errcode"],
      appendPlugins: [
        require("@graphile-contrib/pg-simplify-inflector"),
        require("postgraphile-plugin-connection-filter"),
      ],
      exportGqlSchemaPath: "schema.graphql",
      graphiql: true,
      graphiqlRoute: "/api/graphiql",
      enhanceGraphiql: true,
      allowExplain(req) {
        // TODO: customise condition!
        return true;
      },
      enableQueryBatching: true,
      legacyRelations: "omit",
      graphqlRoute: "/api/graphql",
      enableCors: true,
      skipPlugins: [NodePlugin],
      pgSettings: async () => ({
        role: hasSession ? "admin" : "anonymous",
      }),
    })(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
};

export const postgraphileHandler = withSession(runPostgraphile);
