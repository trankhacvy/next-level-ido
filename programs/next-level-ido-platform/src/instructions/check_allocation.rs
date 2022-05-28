use crate::access_control::*;
use crate::errors::ErrorCode;
use crate::state::{IdoPool, IdoUser, StakeTier};
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct CheckAllocation<'info> {
    #[account(
        mut,
        seeds = [
           b"ido_user", user_authority.key.as_ref(),
        ],
        constraint = ido_user.tier != StakeTier::NoTier @ ErrorCode::NotWhitelist,
        bump
    )]
    ido_user: Box<Account<'info, IdoUser>>,
    pub user_authority: Signer<'info>,
    #[account(
        seeds = [ido_pool.ido_name.as_bytes()],
        bump,
    )]
    pub ido_pool: Box<Account<'info, IdoPool>>,
}

#[access_control(ido_over(&ctx.accounts.ido_pool))]
pub fn exe(ctx: Context<CheckAllocation>) -> Result<()> {
    let total_token = ctx.accounts.ido_pool.ido_token_amount;
    let total_weight = ctx.accounts.ido_pool.current_weight;
    let user_weight = ctx.accounts.ido_user.tier.value().1;
    let deposit_amount = ctx.accounts.ido_user.deposit_amount;
    let token_price_numerator = ctx.accounts.ido_pool.ido_token_price_numerator;
    let token_price_denominator = ctx.accounts.ido_pool.ido_token_price_denominator;

    let token_allocation = total_token
        .checked_mul(user_weight as u64)
        .unwrap()
        .checked_div(total_weight as u64)
        .unwrap();

    let token_allocation_usdc = token_allocation
        .checked_mul(token_price_denominator as u64)
        .unwrap()
        .checked_div(token_price_numerator as u64)
        .unwrap();

    let remaining_amount = std::cmp::max(deposit_amount - token_allocation_usdc, 0);

    let deposited_allocation = deposit_amount
        .checked_mul(token_price_denominator as u64)
        .unwrap()
        .checked_div(token_price_numerator as u64)
        .unwrap();
    ctx.accounts.ido_user.remaining_amount = remaining_amount;
    ctx.accounts.ido_user.allocation = token_allocation;
    ctx.accounts.ido_user.deposited_allocation = deposited_allocation;
    ctx.accounts.ido_user.remaining_allocation = token_allocation - deposited_allocation;
    Ok(())
}
