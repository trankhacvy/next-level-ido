use anchor_lang::prelude::*;

#[account]
pub struct StakePool {}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, Debug, PartialEq)]
pub enum StakeTier {
    NoTier,
    Brone,
    Silver,
    Gold,
    Platium,
    Dimond,
}

impl StakeTier {
    pub fn value(&self) -> (u64, u8) {
        match *self {
            StakeTier::NoTier => (0, 0),
            StakeTier::Brone => (1500_000000, 1),
            StakeTier::Silver => (3000_000000, 3),
            StakeTier::Gold => (5000_000000, 6),
            StakeTier::Platium => (15000_000000, 20),
            StakeTier::Dimond => (30000_000000, 45),
        }
    }
}

impl Default for StakeTier {
    fn default() -> Self {
        StakeTier::NoTier
    }
}

#[account]
pub struct User {
    pub owner: Pubkey,
    pub staked_amount: u64,
    pub tier: StakeTier,
    pub last_stake_ts: i64,
}

impl User {
    pub const SIZE: usize = 8 + 32 + 8 + (1 + 4) + 8;
}

#[event]
pub struct Log {
    pub message: String,
}

#[derive(AnchorSerialize, AnchorDeserialize, Default, Clone, Copy)]
pub struct IdoTimes {
    pub whitelist_start: i64,
    pub whitelist_end: i64,
    pub sale_start: i64,
    pub sale_end: i64,
    pub claim_start: i64,
}

#[derive(AnchorSerialize, AnchorDeserialize, Default, Clone, Copy)]
pub struct Participant {
    pub pubkey: Pubkey,
    pub pool_weight: u8,
}

#[account]
pub struct IdoPool {
    pub ido_name: String,      // UUID 4 + max size 50
    pub ido_authority: Pubkey, // 32

    pub usdc_token_mint: Pubkey,       // 32
    pub redeemable_token_mint: Pubkey, // 32
    pub ido_token_mint: Pubkey,        // 32

    pub usdc_vault: Pubkey,              // 32
    pub ido_token_vault: Pubkey,         // 32
    pub ido_token_price_numerator: u8,   // 1
    pub ido_token_price_denominator: u8, // 1

    pub current_weight: u16, // 2

    pub ido_token_amount: u64,          // 8
    pub commit_fund: u64,               // 8
    pub ido_times: IdoTimes,            // 8 * 9
    pub participant_count: u16,         // 2
    pub participants: Vec<Participant>, //4 + 100 * (32 + 1)  // 100 participants
}

impl IdoPool {
    pub const SIZE: usize = 8
        + (4 + 50)
        + 32
        + 32
        + 32
        + 32
        + 32
        + 32
        + 1
        + 1
        + 2
        + 8
        + 8
        + 8 * 9
        + 2
        + (4 + 100 * (32 + 1));
}

#[account]
pub struct IdoUser {
    pub owner: Pubkey,
    pub deposit_amount: u64,
    pub remaining_amount: u64,
    pub allocation: u64,
    pub deposited_allocation: u64,
    pub remaining_allocation: u64,
    pub tier: StakeTier,
    pub claimed: bool
}

impl IdoUser {
    pub const SIZE: usize = 8 + 32 + 8 + 8 + 8 + 8 + 8 + (1 + 4) + 1;
}
