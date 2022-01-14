import type { NextApiRequest, NextApiResponse } from "next";
import { requireSession, WithSessionProp } from "@clerk/nextjs/api";

type Data = {
  id?: string;
};

export default requireSession(
  (req: WithSessionProp<NextApiRequest>, res: NextApiResponse<Data>) => {
    res.statusCode = 200;
    res.json({ id: req?.session?.userId ?? undefined });
  }
);
