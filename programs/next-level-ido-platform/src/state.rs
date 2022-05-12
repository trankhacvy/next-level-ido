use anchor_lang::prelude::*;

#[account]
pub struct Pool {
    /// Priviledged account.
    pub authority: Pubkey,
    /// Nonce to derive the program-derived address owning the vaults.
    pub nonce: u8,
    /// Paused state of the program
    pub paused: bool,
    /// The vault holding users' xSTEP
    pub x_token_pool_vault: Pubkey,
    /// Mint of the token that can be staked.
    pub staking_mint: Pubkey,
    /// Vault to store staked tokens.
    pub staking_vault: Pubkey,
    /// Mint of the reward A token.
    pub reward_a_mint: Pubkey,
    /// Vault to store reward A tokens.
    pub reward_a_vault: Pubkey,
    /// Mint of the reward B token.
    pub reward_b_mint: Pubkey,
    /// Vault to store reward B tokens.
    pub reward_b_vault: Pubkey,
    /// The period which rewards are linearly distributed.
    pub reward_duration: u64,
    /// The timestamp at which the current reward period ends.
    pub reward_duration_end: u64,
    /// The last time reward states were updated.
    pub last_update_time: u64,
    /// Rate of reward A distribution.
    pub reward_a_rate: u64,
    /// Rate of reward B distribution.
    pub reward_b_rate: u64,
    /// Last calculated reward A per pool token.
    pub reward_a_per_token_stored: u128,
    /// Last calculated reward B per pool token.
    pub reward_b_per_token_stored: u128,
    /// Users staked
    pub user_stake_count: u32,
    /// authorized funders
    /// [] because short size, fixed account size, and ease of use on
    /// client due to auto generated account size property
    pub funders: [Pubkey; 4],
    //the version of the pool
    // pub version: PoolVersion,
    //trailer for future use
    pub trailer: [u8; 31],
}

#[account]
#[derive(Default)]
pub struct User {
    pub owner: Pubkey,
    pub staked_amount: u64,
}

impl User {
    pub const SIZE: usize = 8 + 32 + 8;
}

#[event]
pub struct PriceChange {
    pub old_step_per_xstep_e9: u64,
    pub old_step_per_xstep: String,
    pub new_step_per_xstep_e9: u64,
    pub new_step_per_xstep: String,
}

#[event]
pub struct Price {
    pub step_per_xstep_e9: u64,
    pub step_per_xstep: String,
}
