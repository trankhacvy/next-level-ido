import { StakeTier, Tier } from "types/common";

export const tiersData: Tier[] = [
  {
    name: "Bronze",
    stake_amount: 1500,
    duration: "3 hours before Allocation Round opens",
    whitelist_requirement: "Like, Comment & Retweet",
    guaranteed_allocation: false,
    lottery_ticket: 1,
  },
  {
    name: "Silver",
    stake_amount: 3000,
    duration: "3 hours before Allocation Round opens",
    whitelist_requirement: "Like, Comment & Retweet",
    guaranteed_allocation: false,
    lottery_ticket: 3,
  },
  {
    name: "Gold",
    stake_amount: 5000,
    duration: "3 hours before Allocation Round opens",
    whitelist_requirement: "Like, Comment & Retweet",
    guaranteed_allocation: false,
    lottery_ticket: 7,
  },
  {
    name: "Platium",
    stake_amount: 15000,
    duration: "3 hours before Allocation Round opens",
    whitelist_requirement: "None",
    guaranteed_allocation: true,
    lottery_ticket: 0,
    pool_weight: 10,
  },
  {
    name: "Dimond",
    stake_amount: 30000,
    duration: "3 hours before Allocation Round opens",
    whitelist_requirement: "None",
    guaranteed_allocation: true,
    lottery_ticket: 0,
    pool_weight: 30,
  },
];

export type TierProps = {
  tier: string | null;
  nextTier: string | null;
  pointToNextLevel: number;
};

export const getTierProps = (tier: number): TierProps => {
  // dimond
  if (tier >= 30000) {
    return {
      tier: "Dimond",
      nextTier: null,
      pointToNextLevel: 0,
    };
  }
  // Platium
  if (tier >= 15000) {
    return {
      tier: "Platium",
      nextTier: "Dimond",
      pointToNextLevel: 30000 - tier,
    };
  }
  // Gold
  if (tier >= 5000) {
    return {
      tier: "Gold",
      nextTier: "Platium",
      pointToNextLevel: 15000 - tier,
    };
  }
  // Silver
  if (tier >= 3000) {
    return {
      tier: "Silver",
      nextTier: "Gold",
      pointToNextLevel: 5000 - tier,
    };
  }
  // Bronze
  if (tier >= 1500) {
    return {
      tier: "Bronze",
      nextTier: "Silver",
      pointToNextLevel: 3000 - tier,
    };
  }

  return {
    tier: null,
    nextTier: "Bronze",
    pointToNextLevel: 1500 - tier,
  };
};

export const getTierWeight = (tier: StakeTier) => {
  switch (tier) {
    case "dimond":
      return 45;
    case "platium":
      return 20;
    case "gold":
      return 6;
    case "silver":
      return 3;
    case "brone":
      return 1;
    default:
      return 0;
  }
};
