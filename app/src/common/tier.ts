import { Tier } from "types/common";

export const tiersData: Tier[] = [
    { 
        name: 'Bronze', 
        stake_amount: 1500, 
        duration: '3 hours before Allocation Round opens',
        whitelist_requirement: 'Like, Comment & Retweet',
        guaranteed_allocation: true,
        lottery_ticket: 0,
        pool_weight: 1,
    },
    { 
        name: 'Silver', 
        stake_amount: 3000, 
        duration: '3 hours before Allocation Round opens',
        whitelist_requirement: 'Like, Comment & Retweet',
        guaranteed_allocation: true,
        lottery_ticket: 0,
        pool_weight: 3,
    },
    { 
        name: 'Gold', 
        stake_amount: 5000, 
        duration: '3 hours before Allocation Round opens',
        whitelist_requirement: 'Like, Comment & Retweet',
        guaranteed_allocation: true,
        pool_weight: 6,
    },
    { 
        name: 'Platium', 
        stake_amount: 15000, 
        duration: '3 hours before Allocation Round opens',
        whitelist_requirement: 'None',
        guaranteed_allocation: true,
        lottery_ticket: 0,
        pool_weight: 20,
    },
    { 
        name: 'Dimond', 
        stake_amount: 30000, 
        duration: '3 hours before Allocation Round opens',
        whitelist_requirement: 'None',
        guaranteed_allocation: true,
        lottery_ticket: 0,
        pool_weight: 45,
    },
]