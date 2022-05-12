export interface Project {
    id: number;
    name: string;
    url: string;
    logo: string;
    category?: CategoryEntity[] ;
    color?: null;
    sub_title: string;
    description: string;
    header: string;
    deposit_token: DepositTokenOrSaleToken;
    token_amount: number;
    token_price: number;
    sale_token: DepositTokenOrSaleToken;
    whitelist_start: string;
    whitelist_end: string;
    sale_start: string;
    is_nft: boolean;
    sale_end: string;
    claim_start: string;
    website: string;
    whitepaper?: null;
    documentation?: null;
    discord: string;
    twitter_username: string;
    telegram_channel_username?: null;
    telegram_chat_username: string;
    medium_username: string;
    github_username?: null;
    logo_full?: null;
    on_homepage: boolean;
    content?: number[];
    is_vested: boolean;
    tweet_url: string;
    registration_notice: string;
    lottery_drawn: boolean;
    contributed: number;
    is_closed: boolean;
    is_featured: boolean;
    total_followers: number;
    coingecko_id: string;
    last_price: number;
    ath_price: number;
    curr_roi: number;
    ath_roi: number;
    can_vote: boolean;
    vote_end?: null;
    tx_before_sale?: null;
    tx_until_sale?: null;
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
  
  export interface Tier {
    name: string
    stake_amount: number
    duration: string
    whitelist_requirement: string
    guaranteed_allocation: boolean
    lottery_ticket?: number
    pool_weight?: number
  }