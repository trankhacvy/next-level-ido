import fetcher from 'libs/fetcher';
import { ProjectsRepositoty } from 'libs/supabase';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface ErrorResponse {
  message?: string;
}

const URL = 'https://api.solanium.com/solana/projects/';

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<ErrorResponse>,
) {
  try {
    const response = await fetcher(URL);
    // const { ath_roi, can_vote, tx_before_sale, tx_until_sale, contributed, is_nft, lottery_drawn, on_homepage,total_followers, id, ...item} = response[0];
    const repo = new ProjectsRepositoty();
    const promises = response.map(({ ath_roi, can_vote, tx_before_sale, tx_until_sale, contributed, is_nft, lottery_drawn, on_homepage,total_followers, id, ...item }: any) => repo.create(item))
    await Promise.all(promises);

    res.status(200).json({ message: 'success' });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error?.message });
  }
}