export interface DepositTokenOrSaleToken {
  name: string;
  ticker: string;
  logo: string;
  decimals: number;
  minter: string;
  is_native: boolean;
}

export interface Tier {
  name: string;
  stake_amount: number;
  duration: string;
  whitelist_requirement: string;
  guaranteed_allocation: boolean;
  lottery_ticket?: number;
  pool_weight?: number;
}

export interface Project {
  id: number;
  name: string;
  url: string;
  logo: string;
  category?: CategoryEntity[] | null;
  color?: null;
  sub_title: string;
  description: string;
  header: string;
  on_homepage: boolean;
  deposit_token: DepositTokenOrSaleToken;
  token_amount: number;
  token_price: number;
  sale_token: DepositTokenOrSaleToken;
  whitelist_start: string;
  whitelist_end: string;
  sale_start: string;
  is_nft: boolean;
  no_kyc: boolean;
  round_end?: null;
  sale_end: string;
  claim_start: string;
  website: string;
  whitepaper?: null;
  documentation?: null;
  discord?: null;
  twitter_username: string;
  telegram_channel_username?: null;
  instagram_username: string;
  telegram_chat_username?: null;
  medium_username: string;
  github_username?: null;
  logo_full?: null;
  tweet_instructions: string;
  twitter_follow_required: boolean;
  vesting_instructions: string;
  telegram_join_required: boolean;
  content?: ContentEntity[] | null;
  is_vested: boolean;
  tweet_url: string;
  registration_notice: string;
  lottery_drawn: boolean;
  contributed: number;
  is_closed: boolean;
  is_featured: boolean;
  coingecko_id?: null;
  last_price?: null;
  ath_price?: null;
  curr_roi?: null;
  ath_roi?: null;
  instagram_post_id: string;
  eth_address_required: boolean;
  youtube_url?: null;
  facebook_url?: null;
  tiktok_url?: null;
  distribution_notice: string;
  distribution_url?: null;
  video_url?: null;
  can_vote: boolean;
  vote_end: string;
  tx_before_sale?: null;
  tx_until_sale?: null;
  followers: number;
  created_at: string;
}
export interface CategoryEntity {
  name: string;
}
export interface DepositTokenOrSaleToken {
  name: string;
  ticker: string;
  logo: string;
  decimals: number;
  minter: string;
  is_native: boolean;
}
export interface ContentEntity {
  title: string;
  url: string;
  intro: string;
  img?: string | null;
  content: string;
  title_cn: string;
  intro_cn: string;
  content_cn: string;
}

export type ProjectStatus = "live" | "upcoming" | "ended";

export type StakeTier =
  | "noTier"
  | "brone"
  | "silver"
  | "gold"
  | "platium"
  | "dimond";

export type ProjectTimeline =
  | "preparation"
  | "whitelist"
  | "sale"
  | "distribution"
  | "unknow";
