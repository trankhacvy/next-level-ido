use crate::access_control::*;
use crate::errors::ErrorCode;
use crate::state::{IdoPool, IdoUser, StakeTier};
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Burn, CloseAccount, Mint, Token, TokenAccount, Transfer};

#[derive(Accounts)]
pub struct ClaimToken<'info> {
    #[account(
        mut,
        seeds = [
           b"ido_user", user_authority.key.as_ref(),
        ],
        constraint = ido_user.tier != StakeTier::NoTier @ ErrorCode::NotWhitelist,
        bump
    )]
    ido_user: Box<Account<'info, IdoUser>>,

    pub payer: Signer<'info>,
    #[account(mut)]
    /// CHECK: Just a pure account
    pub user_authority: AccountInfo<'info>,
    #[account(
        mut,
        constraint = user_ido_token.owner == user_authority.key(),
        constraint = user_ido_token.mint == ido_token_mint.key()
    )]
    pub user_ido_token: Box<Account<'info, TokenAccount>>,
    #[account(
        mut,
        seeds = [
            user_authority.key().as_ref(),
            ido_account.ido_name.as_bytes(),
            b"user_redeemable"],
        bump
    )]
    pub user_redeemable: Box<Account<'info, TokenAccount>>,

    #[account(
        seeds = [ido_account.ido_name.as_bytes()],
        bump,
        has_one = ido_token_mint
    )]
    pub ido_account: Box<Account<'info, IdoPool>>,
    pub ido_token_mint: Account<'info, Mint>,
    // vault to hold ido token
    #[account(
        mut,
        seeds = [ido_account.ido_name.as_bytes(), b"ido_token_vault"],
        bump
    )]
    pub ido_token_vault: Box<Account<'info, TokenAccount>>,
    #[account(mut,
        seeds = [ido_account.ido_name.as_bytes(), b"redeemable_mint"],
        bump
    )]
    pub redeemable_mint: Box<Account<'info, Mint>>,
    pub token_program: Program<'info, Token>,
}

#[access_control(ido_over(&ctx.accounts.ido_account))]
pub fn exe(ctx: Context<ClaimToken>) -> Result<()> {
    let allocation = ctx.accounts.ido_user.allocation;
    let remaining_deposit = ctx.accounts.ido_user.deposit_amount;

    let ido_name = ctx.accounts.ido_account.ido_name.as_bytes();
    let seeds = &[ido_name, &[*ctx.bumps.get("ido_account").unwrap()]];
    let signer = &[&seeds[..]];

    // Burn the user's redeemable tokens.
    let cpi_accounts = Burn {
        mint: ctx.accounts.redeemable_mint.to_account_info(),
        from: ctx.accounts.user_redeemable.to_account_info(),
        authority: ctx.accounts.ido_account.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer);
    token::burn(cpi_ctx, remaining_deposit)?;

    // transfer ido token to user
    let cpi_ctx = CpiContext::new_with_signer(
        ctx.accounts.token_program.to_account_info(),
        Transfer {
            from: ctx.accounts.ido_token_vault.to_account_info(),
            to: ctx.accounts.user_ido_token.to_account_info(),
            authority: ctx.accounts.ido_account.to_account_info(),
        },
        signer,
    );
    token::transfer(cpi_ctx, allocation)?;

    ctx.accounts.ido_user.deposit_amount = 0;
    ctx.accounts.ido_user.claimed = true;

    // Send rent back to user if account is empty
    ctx.accounts.user_redeemable.reload()?;
    if ctx.accounts.user_redeemable.amount == 0 {
        let cpi_accounts = CloseAccount {
            account: ctx.accounts.user_redeemable.to_account_info(),
            destination: ctx.accounts.user_authority.clone(),
            authority: ctx.accounts.ido_account.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer);
        token::close_account(cpi_ctx)?;
    }

    Ok(())
}
