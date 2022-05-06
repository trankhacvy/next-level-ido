use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, Token, TokenAccount};

#[derive(Accounts)]
pub struct InitializePool<'info> {
    pub token_mint: Account<'info, Mint>,
    #[account(
        init,
        payer = initializer,
        mint::decimals = token_mint.decimals,
        mint::authority = x_token_mint,
        seeds = ["mint".as_ref(), token_mint.key().as_ref()],
        bump
    )]
    x_token_mint: Account<'info, Mint>,
    #[account(
        init,
        payer = initializer,
        token::mint = token_mint,
        token::authority = token_vault,
        seeds = ["vault".as_ref(), token_mint.key().as_ref()],
        bump
    )]
    pub token_vault: Account<'info, TokenAccount>,
    #[account(mut)]
    initializer: Signer<'info>,
    ///used by anchor for init of the above
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn exe(_ctx: Context<InitializePool>) -> Result<()> {
    Ok(())
}
