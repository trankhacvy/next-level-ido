use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token, TokenAccount};

#[derive(Accounts)]
pub struct InitializeStakePool<'info> {
    pub token_mint: Account<'info, Mint>, // ARI token mint
    #[account(
        init,
        payer = token_authority,
        token::mint = token_mint,
        token::authority = token_vault,
        seeds = [b"vault", token_mint.key().as_ref()],
        bump
    )]
    pub token_vault: Account<'info, TokenAccount>,
    #[account(mut)]
    token_authority: Signer<'info>,
    ///used by anchor for init of the above
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn exe(_ctx: Context<InitializeStakePool>) -> Result<()> {
    Ok(())
}
