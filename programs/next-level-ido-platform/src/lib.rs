use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

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

    pub fn stake(ctx: Context<Stake>, mint_bump: u8, amount: u64) -> Result<()> {
        stake::exe(ctx, mint_bump, amount)
    }

    pub fn unstake(ctx: Context<Unstake>, vault_bump: u8, amount: u64) -> Result<()> {
        unstake::exe(ctx, vault_bump, amount)
    }
}
