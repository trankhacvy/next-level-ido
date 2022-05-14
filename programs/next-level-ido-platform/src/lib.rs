use anchor_lang::prelude::*;

declare_id!("EQQc7CVfiLnSPkA1T4ddTSBbVjv39uWgtRGNJssp61a3");

pub mod instructions;
pub use instructions::*;

pub mod state;
pub use state::*;

pub mod errors;
pub use errors::*;

pub mod utils;
pub use utils::*;

#[program]
pub mod next_level_ido_platform {
    use super::*;

    pub fn initialize(ctx: Context<InitializePool>) -> Result<()> {
        initialize_pool::exe(ctx)
    }

    pub fn initialize_ido_pool(
        ctx: Context<InitializeIdoPool>,
        ido_name: String,
        initial_token_amount: u64,
        ido_times: IdoTimes,
    ) -> Result<()> {
        msg!("initialize_ido_pool");
        initialize_ido_pool::exe(ctx, ido_name, initial_token_amount, ido_times)
    }

    pub fn stake(ctx: Context<Stake>, amount: u64) -> Result<()> {
        stake::exe(ctx, amount)
    }

    pub fn unstake(ctx: Context<Unstake>, amount: u64) -> Result<()> {
        unstake::exe(ctx, amount)
    }
}
