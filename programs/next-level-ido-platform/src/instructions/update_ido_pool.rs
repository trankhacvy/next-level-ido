use crate::errors::ErrorCode;
use crate::state::{IdoPool, IdoTimes};
use anchor_lang::prelude::*;

#[derive(Accounts)]
#[instruction(ido_name: String)]
pub struct UpdateIdoPool<'info> {
    #[account(mut)]
    pub ido_authority: Signer<'info>,
    #[account(
        mut,
        seeds = [ido_name.as_bytes()],
        bump,
    )]
    pub ido_pool: Box<Account<'info, IdoPool>>,
}

pub fn exe(
    ctx: Context<UpdateIdoPool>,
    ido_name: String,
    initial_token_amount: Option<u64>,
    commit_fund: Option<u64>,
    token_price_numerator: Option<u8>,
    token_price_denominator: Option<u8>,
    ido_times: Option<IdoTimes>,
) -> Result<()> {
    msg!("UpdateIdoPool");

    let ido_pool = &mut ctx.accounts.ido_pool;

    if ido_name != ido_pool.ido_name {
        return err!(ErrorCode::InvalidIdoName);
    }

    if let Some(initial_token_amount) = initial_token_amount {
        ido_pool.ido_token_amount = initial_token_amount;
    }

    if let Some(commit_fund) = commit_fund {
        ido_pool.commit_fund = commit_fund;
    }

    if let Some(token_price_numerator) = token_price_numerator {
        ido_pool.ido_token_price_numerator = token_price_numerator;
    }

    if let Some(token_price_denominator) = token_price_denominator {
        ido_pool.ido_token_price_denominator = token_price_denominator;
    }

    if let Some(ido_times) = ido_times {
        ido_pool.ido_times = ido_times;
    }

    Ok(())
}
