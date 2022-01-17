import { WithSessionProp, WithSessionClaimsProp } from "@clerk/nextjs/api";
import { NextApiRequest, NextApiResponse } from "next";

declare module "@clerk/nextjs/api" {
  declare const withSession: (
    handler: Function
  ) => (
    req: WithSessionProps<NextApiRequest>,
    res: NextApiResponse
  ) => Promise<any>;
}
