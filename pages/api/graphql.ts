import { postgraphileHandler } from "@/server/postgraphile-handler";
import { WithSessionProp } from "@clerk/nextjs/api";

// GraphQL route that handles queries
// Type definitions do not match up...?
export default async (req: WithSessionProp<any>, res: any) => {
  res.statusCode = 200;
  await postgraphileHandler(req, res);
  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};
