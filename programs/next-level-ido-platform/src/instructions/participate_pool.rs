use crate::errors::ErrorCode;
use crate::state::{IdoPool, IdoUser, Participant, StakeTier, User};
use crate::utils::TrimAsciiWhitespace;
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, MintTo, Token, TokenAccount, Transfer};

#[derive(Accounts)]
// do validate time
pub struct ParticipatePool<'info> {
    #[account(mut)]
    pub user_authority: Signer<'info>,
    #[account(
        mut,
        seeds = [
           b"user", user_authority.key.as_ref(),
        ],
        constraint = user.tier != StakeTier::NoTier @ ErrorCode::NotWhitelist,
        bump
    )]
    user: Box<Account<'info, User>>,

    #[account(
        init_if_needed,
        payer = user_authority,
        space = IdoUser::SIZE,
        seeds = [
           b"ido_user", user_authority.key.as_ref(),
        ],
        bump
    )]
    ido_user: Box<Account<'info, IdoUser>>,

    #[account(mut,
        constraint = user_usdc.owner == user_authority.key(),
        constraint = user_usdc.mint == usdc_mint.key())]
    pub user_usdc: Box<Account<'info, TokenAccount>>,
    pub usdc_mint: Box<Account<'info, Mint>>,

    #[account(
        init_if_needed,
        payer = user_authority,
        token::mint = redeemable_mint,
        token::authority = ido_account,
        seeds = [user_authority.key().as_ref(),
            ido_account.ido_name.as_ref().trim_ascii_whitespace(),
            b"user_redeemable"],
        bump
    )]
    pub user_redeemable: Box<Account<'info, TokenAccount>>,
    #[account(mut,
        seeds = [ido_account.ido_name.as_ref().trim_ascii_whitespace(), b"redeemable_mint"],
        bump
    )]
    pub redeemable_mint: Box<Account<'info, Mint>>,

    #[account(
        mut,
        seeds = [ido_account.ido_name.as_ref().trim_ascii_whitespace(), b"usdc_vault"],
        bump,
    )]
    pub usdc_vault: Box<Account<'info, TokenAccount>>,

    #[account(
        mut,
        seeds = [ido_account.ido_name.as_ref().trim_ascii_whitespace()],
        bump
    )]
    pub ido_account: Box<Account<'info, IdoPool>>,

    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
}
// join pool, can be lock some USDC
pub fn exe(ctx: Context<ParticipatePool>, amount: u64) -> Result<()> {
    msg!("EXCHANGE USDC FOR REDEEMABLE");

    if ctx.accounts.user_usdc.amount < amount {
        return err!(ErrorCode::LowUsdc);
    }

    ctx.accounts.ido_account.participant_count = ctx.accounts.ido_account.participant_count + 1;
    ctx.accounts.ido_account.participants.push(Participant {
        pubkey: ctx.accounts.user.owner,
        pool_weight: ctx.accounts.user.tier.value().1,
    });
    ctx.accounts.ido_account.current_weight += ctx.accounts.user.tier.value().1 as u16;

    ctx.accounts.ido_user.owner = ctx.accounts.user.owner;
    ctx.accounts.ido_user.tier = ctx.accounts.user.tier;
    ctx.accounts.ido_user.deposit_amount = amount;

    // Transfer user's USDC to pool USDC account.
    let cpi_accounts = Transfer {
        from: ctx.accounts.user_usdc.to_account_info(),
        to: ctx.accounts.usdc_vault.to_account_info(),
        authority: ctx.accounts.user_authority.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    token::transfer(cpi_ctx, amount)?;

    // Mint Redeemable to user Redeemable account.
    let ido_name = ctx.accounts.ido_account.ido_name.as_ref();
    let seeds = &[
        ido_name.trim_ascii_whitespace(),
        &[*ctx.bumps.get("ido_account").unwrap()],
    ];
    let signer = &[&seeds[..]];
    let cpi_accounts = MintTo {
        mint: ctx.accounts.redeemable_mint.to_account_info(),
        to: ctx.accounts.user_redeemable.to_account_info(),
        authority: ctx.accounts.ido_account.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer);
    token::mint_to(cpi_ctx, amount)?;

    Ok(())
}
