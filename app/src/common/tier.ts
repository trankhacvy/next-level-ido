import { Tier } from "types/common";

export const tiersData: Tier[] = [
    { 
        name: 'Bronze', 
        stake_amount: 1000, 
        duration: '3 hours before Allocation Round opens',
        whitelist_requirement: 'Like, Comment & Retweet',
        guaranteed_allocation: false,
        lottery_ticket: 1,
    },
    { 
        name: 'Silver', 
        stake_amount: 2500, 
        duration: '3 hours before Allocation Round opens',
        whitelist_requirement: 'Like, Comment & Retweet',
        guaranteed_allocation: false,
        lottery_ticket: 3,
    },
    { 
        name: 'Gold', 
        stake_amount: 5000, 
        duration: '3 hours before Allocation Round opens',
        whitelist_requirement: 'Like, Comment & Retweet',
        guaranteed_allocation: false,
        lottery_ticket: 7,
    },
    { 
        name: 'Platium', 
        stake_amount: 10000, 
        duration: '3 hours before Allocation Round opens',
        whitelist_requirement: 'None',
        guaranteed_allocation: true,
        lottery_ticket: 0,
        pool_weight: 10,
    },
    { 
        name: 'Dimond', 
        stake_amount: 30000, 
        duration: '3 hours before Allocation Round opens',
        whitelist_requirement: 'None',
        guaranteed_allocation: true,
        lottery_ticket: 0,
        pool_weight: 30,
    },
]