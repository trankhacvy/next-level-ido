import fetcher from 'libs/fetcher';
import { ProjectsRepositoty } from 'libs/supabase';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface ErrorResponse {
  message?: string;
}

const URL = 'https://api.solanium.com/solana/projects/';
const DETAIL_URL = 'https://api.solanium.com/solana/project/';

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<ErrorResponse>,
) {
  try {
    const repo = new ProjectsRepositoty();
    const response = await fetcher(URL);
    
    response.forEach(async (proj: any) => {
        try {
          console.log('start fetch project ', proj.name);
          const project = await fetcher(`${DETAIL_URL}${proj.url}`);
          console.log('project detail', project.id);

          delete project.id;
          delete project.can_vote;
          delete project.contributed;
          delete project.tx_before_sale;
          delete project.tx_until_sale;
          delete project.eth_address_required;
          delete project.instagram_post_id;
          delete project.instagram_username;
          delete project.lottery_drawn;

          await repo.create(project)
          console.log('end fetch project ', proj.name);
        } catch (error) {
          console.error(error);
        }
    });

    res.status(200).json({ message: 'success' });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error?.message });
  }
}
