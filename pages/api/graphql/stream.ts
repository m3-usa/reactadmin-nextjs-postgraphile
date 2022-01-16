import { postgraphileHandler } from "@/server/postgraphile-handler";

// Endpoint needed for graphiql
export default async (req: any, res: any) => {
  res.statusCode = 200;
  await postgraphileHandler(req, res);
  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};
