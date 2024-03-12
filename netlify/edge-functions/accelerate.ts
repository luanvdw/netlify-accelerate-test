import type { Config, Context } from "@netlify/edge-functions";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

export default async (request: Request, context: Context) => {

  const dbURL = Netlify.env.get("MY_IMPORTANT_VARIABLE")

  const prisma = new PrismaClient({
    datasourceUrl: dbURL,
  }).$extends(withAccelerate())

  const users = await prisma.user.findMany();

  return Response.json({
    users: users,
  });
};

export const config: Config = {
  path: "/accelerate",
};