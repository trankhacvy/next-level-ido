use crate::access_control::*;
use crate::errors::ErrorCode;
use crate::state::{IdoPool, IdoUser, StakeTier};
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Burn, CloseAccount, Mint, Token, TokenAccount, Transfer};

#[derive(Accounts)]
pub struct Refund<'info> {
    #[account(
        mut,
        seeds = [
           b"ido_user", user_authority.key.as_ref(),
        ],
        constraint = ido_user.tier != StakeTier::NoTier @ ErrorCode::NotWhitelist,
        bump
    )]
    pub ido_user: Box<Account<'info, IdoUser>>,
    pub user_authority: Signer<'info>,

    #[account(mut,
        constraint = user_usdc.owner == user_authority.key(),
        constraint = user_usdc.mint == usdc_mint.key())]
    pub user_usdc: Box<Account<'info, TokenAccount>>,
    pub usdc_mint: Box<Account<'info, Mint>>,

    #[account(
        mut,
        seeds = [ido_pool.ido_name.as_bytes(), b"usdc_vault"],
        bump,
    )]
    pub usdc_vault: Box<Account<'info, TokenAccount>>,
    #[account(
        mut,
        seeds = [
            user_authority.key().as_ref(),
            ido_pool.ido_name.as_bytes(),
            b"user_redeemable"],
        bump
    )]
    pub user_redeemable: Box<Account<'info, TokenAccount>>,

    #[account(
        seeds = [ido_pool.ido_name.as_bytes()],
        bump,
    )]
    pub ido_pool: Box<Account<'info, IdoPool>>,
    #[account(mut,
        seeds = [ido_pool.ido_name.as_bytes(), b"redeemable_mint"],
        bump
    )]
    pub redeemable_mint: Box<Account<'info, Mint>>,

    pub token_program: Program<'info, Token>,
}

// TODO need different access control, right?
#[access_control(ido_over(&ctx.accounts.ido_pool))]
pub fn exe(ctx: Context<Refund>) -> Result<()> {
    let remaining_usdc = ctx.accounts.ido_user.deposit_amount;

    let ido_name = ctx.accounts.ido_pool.ido_name.as_bytes();
    let seeds = &[ido_name, &[*ctx.bumps.get("ido_pool").unwrap()]];
    let signer = &[&seeds[..]];

    // Burn the user's redeemable tokens.
    let cpi_accounts = Burn {
        mint: ctx.accounts.redeemable_mint.to_account_info(),
        from: ctx.accounts.user_redeemable.to_account_info(),
        authority: ctx.accounts.ido_pool.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer);
    token::burn(cpi_ctx, remaining_usdc)?;

    // transfer usdc token to user
    let cpi_ctx = CpiContext::new_with_signer(
        ctx.accounts.token_program.to_account_info(),
        Transfer {
            from: ctx.accounts.usdc_vault.to_account_info(),
            to: ctx.accounts.user_usdc.to_account_info(),
            authority: ctx.accounts.ido_pool.to_account_info(),
        },
        signer,
    );
    token::transfer(cpi_ctx, remaining_usdc)?;

    // Send rent back to user if account is empty
    ctx.accounts.user_redeemable.reload()?;
    if ctx.accounts.user_redeemable.amount == 0 {
        let cpi_accounts = CloseAccount {
            account: ctx.accounts.user_redeemable.to_account_info(),
            destination: ctx.accounts.user_authority.to_account_info(),
            authority: ctx.accounts.ido_pool.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer);
        token::close_account(cpi_ctx)?;
    }

    ctx.accounts.ido_user.deposit_amount = 0;
    ctx.accounts.ido_user.remaining_allocation = 0;

    Ok(())
}
