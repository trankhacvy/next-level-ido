use crate::state::User;
use crate::utils::update_user_tier;
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount};
use std::convert::TryInto;

#[derive(Accounts)]
pub struct Unstake<'info> {
    // stake token
    pub token_mint: Account<'info, Mint>,
    #[account(
        mut,
    )]
    // lp token
    pub x_token_mint: Account<'info, Mint>,

    #[account(mut)]
    // staker's LP token account
    pub x_token_from: Account<'info, TokenAccount>,
    //the authority allowed to transfer from x_token_from
    pub x_token_from_authority: Signer<'info>,

    #[account(
        mut,
        seeds = [b"vault", token_mint.key().as_ref() ],
        bump,
    )]
    // stake token vault
    pub token_vault: Account<'info, TokenAccount>,

    #[account(
        mut,
        seeds = [
           b"user", x_token_from_authority.key.as_ref(),
        ],
        bump
    )]
    user: Box<Account<'info, User>>,

    #[account(mut)]
    // staker's stake token account
    pub token_to: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

pub fn exe(ctx: Context<Unstake>, amount: u64) -> Result<()> {
    let total_token = ctx.accounts.token_vault.amount;
    let total_x_token = ctx.accounts.x_token_mint.supply;

    // update user info
    ctx.accounts.user.staked_amount = ctx.accounts.user.staked_amount.checked_sub(amount).unwrap();

    let now = Clock::get().unwrap().unix_timestamp;
    update_user_tier(&mut ctx.accounts.user, now);

    //burn LP of user
    let cpi_ctx = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        token::Burn {
            mint: ctx.accounts.x_token_mint.to_account_info(),
            from: ctx.accounts.x_token_from.to_account_info(),
            authority: ctx.accounts.x_token_from_authority.to_account_info(),
        },
    );
    token::burn(cpi_ctx, amount)?;

    //determine user share of vault
    let what: u64 = (amount as u128)
        .checked_mul(total_token as u128)
        .unwrap()
        .checked_div(total_x_token as u128)
        .unwrap()
        .try_into()
        .unwrap();

    //compute vault signer seeds
    let token_mint_key = ctx.accounts.token_mint.key();
    let seeds = &[
        b"vault",
        token_mint_key.as_ref(),
        &[*ctx.bumps.get("token_vault").unwrap()],
    ];
    let signer = &[&seeds[..]];

    //transfer stake token from vault to user
    let cpi_ctx = CpiContext::new_with_signer(
        ctx.accounts.token_program.to_account_info(),
        token::Transfer {
            from: ctx.accounts.token_vault.to_account_info(),
            to: ctx.accounts.token_to.to_account_info(),
            authority: ctx.accounts.token_vault.to_account_info(),
        },
        signer,
    );
    token::transfer(cpi_ctx, what)?;

    Ok(())
}
