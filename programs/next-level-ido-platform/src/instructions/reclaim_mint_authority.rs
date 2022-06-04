use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount};
use spl_token::instruction::AuthorityType;

#[derive(Accounts)]
pub struct ReclaimMintAuthority<'info> {
    pub token_mint: Account<'info, Mint>,
    #[account(mut)]
    pub x_token_mint: Box<Account<'info, Mint>>,
    #[account(
        mut,
        seeds = [b"vault", token_mint.key().as_ref()],
        bump
    )]
    pub token_vault: Account<'info, TokenAccount>,
    #[account(
        mut,
        address = token_mint.mint_authority.unwrap(),
    )]
    pub token_authority: Signer<'info>,

    pub token_program: Program<'info, Token>,
}

pub fn exe(ctx: Context<ReclaimMintAuthority>) -> Result<()> {
    let token_mint_key = ctx.accounts.token_mint.key();
    let seeds = &[
        b"vault",
        token_mint_key.as_ref(),
        &[*ctx.bumps.get("token_vault").unwrap()],
    ];
    let signer = &[&seeds[..]];

    let cpi_ctx = CpiContext::new_with_signer(
        ctx.accounts.token_program.to_account_info(),
        token::SetAuthority {
            current_authority: ctx.accounts.token_authority.to_account_info(),
            account_or_mint: ctx.accounts.x_token_mint.to_account_info(),
        },
        signer,
    );
    token::set_authority(
        cpi_ctx,
        AuthorityType::MintTokens,
        Some(ctx.accounts.token_vault.key()),
    )?;

    Ok(())
}
