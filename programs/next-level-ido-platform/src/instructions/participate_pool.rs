use crate::errors::ErrorCode;
use crate::state::{IdoPool, Participant, StakeTier, User};
use crate::utils::TrimAsciiWhitespace;
use anchor_lang::prelude::*;

#[derive(Accounts)]
// do validate time
pub struct ParticipatePool<'info> {
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
        mut,
        seeds = [ido_account.ido_name.as_ref().trim_ascii_whitespace()],
        bump
    )]
    pub ido_account: Box<Account<'info, IdoPool>>,
}
// join pool, can be lock some USDC
pub fn exe(ctx: Context<ParticipatePool>) -> Result<()> {
    ctx.accounts.ido_account.participant_count = ctx.accounts.ido_account.participant_count + 1;
    ctx.accounts.ido_account.participants.push(Participant {
        pubkey: ctx.accounts.user.owner,
        pool_weight: ctx.accounts.user.tier.value().1,
    });
    ctx.accounts.ido_account.current_weight += ctx.accounts.user.tier.value().1 as u16;
    Ok(())
}
