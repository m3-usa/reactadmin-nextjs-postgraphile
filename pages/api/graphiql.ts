import { postgraphileHandler } from "@/server/postgraphile-handler";

// Graphiql route that handles rendering graphiql
// https://github.com/graphql/graphiql
// An interactive in-browser GraphQL IDE
export default async (req: any, res: any) => {
  res.statusCode = 200;
  await postgraphileHandler(req, res);
  res.end();
};
