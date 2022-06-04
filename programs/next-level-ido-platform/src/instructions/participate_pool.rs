use crate::access_control::*;
use crate::errors::ErrorCode;
use crate::state::{IdoPool, IdoUser, Participant, StakeTier, User};
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, MintTo, Token, TokenAccount, Transfer};

#[derive(Accounts)]
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
        token::authority = ido_pool,
        seeds = [user_authority.key().as_ref(),
            ido_pool.ido_name.as_bytes(),
            b"user_redeemable"],
        bump
    )]
    pub user_redeemable: Box<Account<'info, TokenAccount>>,
    #[account(mut,
        seeds = [ido_pool.ido_name.as_bytes(), b"redeemable_mint"],
        bump
    )]
    pub redeemable_mint: Box<Account<'info, Mint>>,

    #[account(
        mut,
        seeds = [ido_pool.ido_name.as_bytes(), b"usdc_vault"],
        bump,
    )]
    pub usdc_vault: Box<Account<'info, TokenAccount>>,

    #[account(
        mut,
        seeds = [ido_pool.ido_name.as_bytes()],
        bump
    )]
    pub ido_pool: Box<Account<'info, IdoPool>>,

    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
}

#[access_control(whilelist_phase(&ctx.accounts.ido_pool))]
pub fn exe(ctx: Context<ParticipatePool>, amount: u64) -> Result<()> {
    if ctx.accounts.user_usdc.amount < amount {
        return err!(ErrorCode::LowUsdc);
    }

    if ctx.accounts.ido_pool.commit_fund > amount {
        return err!(ErrorCode::LowCommitFund);
    }

    ctx.accounts.ido_pool.participant_count = ctx.accounts.ido_pool.participant_count + 1;
    ctx.accounts.ido_pool.participants.push(Participant {
        pubkey: ctx.accounts.user.owner,
        pool_weight: ctx.accounts.user.tier.value().1,
    });
    ctx.accounts.ido_pool.current_weight += ctx.accounts.user.tier.value().1 as u16;

    ctx.accounts.ido_user.owner = ctx.accounts.user.owner;
    ctx.accounts.ido_user.tier = ctx.accounts.user.tier;
    ctx.accounts.ido_user.deposit_amount = amount;
    ctx.accounts.ido_user.remaining_amount = amount;
    ctx.accounts.ido_user.allocation = 0;
    ctx.accounts.ido_user.deposited_allocation = 0;
    ctx.accounts.ido_user.remaining_allocation = 0;
    ctx.accounts.ido_user.claimed = false;

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
    let seeds = &[
        ctx.accounts.ido_pool.ido_name.as_bytes(),
        &[*ctx.bumps.get("ido_pool").unwrap()],
    ];
    let signer = &[&seeds[..]];
    let cpi_accounts = MintTo {
        mint: ctx.accounts.redeemable_mint.to_account_info(),
        to: ctx.accounts.user_redeemable.to_account_info(),
        authority: ctx.accounts.ido_pool.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer);
    token::mint_to(cpi_ctx, amount)?;

    Ok(())
}
