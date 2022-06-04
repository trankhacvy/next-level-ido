use anchor_lang::prelude::*;

declare_id!("H8sDPuASnf5PJfuRNUwYd7K3LMaDnGqyM66RFuM6VKXg");

pub mod instructions;
pub use instructions::*;

pub mod state;
pub use state::*;

pub mod errors;
pub use errors::*;

pub mod utils;
pub use utils::*;

pub mod access_control;
pub mod constant;

#[program]
pub mod next_level_ido_platform {
    use super::*;

    pub fn initialize_stake_pool(ctx: Context<InitializeStakePool>) -> Result<()> {
        initialize_stake_pool::exe(ctx)
    }

    pub fn reclaim_mint_authority(ctx: Context<ReclaimMintAuthority>) -> Result<()> {
        reclaim_mint_authority::exe(ctx)
    }

    pub fn stake(ctx: Context<Stake>, amount: u64) -> Result<()> {
        stake::exe(ctx, amount)
    }

    pub fn unstake(ctx: Context<Unstake>, amount: u64) -> Result<()> {
        unstake::exe(ctx, amount)
    }

    pub fn initialize_ido_pool(
        ctx: Context<InitializeIdoPool>,
        ido_name: String,
        initial_token_amount: u64,
        commit_fund: u64,
        token_price_numerator: u8,
        token_price_denominator: u8,
        ido_times: IdoTimes,
    ) -> Result<()> {
        initialize_ido_pool::exe(
            ctx,
            ido_name,
            initial_token_amount,
            commit_fund,
            token_price_numerator,
            token_price_denominator,
            ido_times,
        )
    }

    pub fn update_ido_pool(
        ctx: Context<UpdateIdoPool>,
        ido_name: String,
        initial_token_amount: Option<u64>,
        commit_fund: Option<u64>,
        token_price_numerator: Option<u8>,
        token_price_denominator: Option<u8>,
        ido_times: Option<IdoTimes>,
    ) -> Result<()> {
        update_ido_pool::exe(
            ctx,
            ido_name,
            initial_token_amount,
            commit_fund,
            token_price_numerator,
            token_price_denominator,
            ido_times,
        )
    }

    pub fn participate_pool(ctx: Context<ParticipatePool>, amount: u64) -> Result<()> {
        participate_pool::exe(ctx, amount)
    }

    pub fn simulate_pool_paticipants(ctx: Context<SimulatePoolPaticipants>) -> Result<()> {
        simulate_pool_paticipants::exe(ctx)
    }

    pub fn check_allocation(ctx: Context<CheckAllocation>) -> Result<()> {
        check_allocation::exe(ctx)
    }

    pub fn claim_remaining_fund(ctx: Context<ClaimRemainingFund>) -> Result<()> {
        claim_remaining_fund::exe(ctx)
    }

    pub fn claim_token(ctx: Context<ClaimToken>) -> Result<()> {
        claim_token::exe(ctx)
    }

    pub fn refund(ctx: Context<Refund>) -> Result<()> {
        refund::exe(ctx)
    }
}
