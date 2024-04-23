// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const sleep = (duration: number) =>
  new Promise((resolve) => setTimeout(resolve, duration));

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  await sleep(500);
  res.status(200).json({ name: "John Doe" });
}
