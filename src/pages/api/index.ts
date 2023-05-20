import { NextApiRequest, NextApiResponse } from 'next';

export default async function GET(
  request: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).send('Hello from devfolio server Next js');
}
