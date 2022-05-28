import { ProjectsRepositoty } from "libs/supabase";
import type { NextApiRequest, NextApiResponse } from "next";
import dayjs from "dayjs";

export interface SimpleResponse {
  message?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SimpleResponse>
) {
  try {
    const repo = new ProjectsRepositoty();
    const { id, type } = req.body;

    let start_whitelist;
    let end_whitelist;
    let start_sale;
    let end_sale;
    let claim;

    if (type === "whitelist") {
      end_whitelist = dayjs().subtract(12, "h");
      start_whitelist = end_whitelist.subtract(1, "d");
      start_sale = dayjs().subtract(4, "h");

      await repo.update(id, {
        whitelist_start: start_whitelist.toISOString(),
        whitelist_end: end_whitelist.toISOString(),
        sale_start: start_sale.toISOString(),
      });
    }

    if (type === "sale") {
      end_sale = dayjs().subtract(4, "h");
      start_sale = end_sale.subtract(1, "d");
      end_whitelist = start_sale.subtract(4, "h");
      start_whitelist = end_whitelist.subtract(1, "d");

      await repo.update(id, {
        whitelist_start: start_whitelist.toISOString(),
        whitelist_end: end_whitelist.toISOString(),
        sale_start: start_sale.toISOString(),
        sale_end: end_sale.toISOString(),
      });
    }

    if (type === "distribution") {
      claim = dayjs().subtract(4, "h");
      end_sale = claim.subtract(1, "d");
      start_sale = end_sale.subtract(1, "d");
      end_whitelist = start_sale.subtract(4, "h");
      start_whitelist = end_whitelist.subtract(1, "d");

      await repo.update(id, {
        whitelist_start: start_whitelist.toISOString(),
        whitelist_end: end_whitelist.toISOString(),
        sale_start: start_sale.toISOString(),
        sale_end: end_sale.toISOString(),
        claim_start: claim.toISOString(),
      });
    }

    res.status(200).json({ message: "success" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error?.message });
  }
}
