use crate::state::IdoPool;
use anchor_lang::prelude::*;

#[derive(Accounts)]
// do validate time
pub struct SimulatePoolPaticipants<'info> {
    pub ido_authority: Signer<'info>,
    #[account(
        mut,
        has_one = ido_authority,
        seeds = [ido_pool.ido_name.as_bytes()],
        bump
    )]
    pub ido_pool: Box<Account<'info, IdoPool>>,
}

// use this function for demo purpose
pub fn exe(ctx: Context<SimulatePoolPaticipants>) -> Result<()> {
    msg!("SimulatePoolPaticipants");

    ctx.accounts.ido_pool.participant_count = 100;
    ctx.accounts.ido_pool.current_weight = 1380;

    Ok(())
}
