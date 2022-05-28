use crate::state::User;
use crate::utils::update_user_tier;
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount};
use std::convert::TryInto;

#[derive(Accounts)]
pub struct Stake<'info> {
    pub token_mint: Account<'info, Mint>,
    #[account(mut)]
    pub x_token_mint: Account<'info, Mint>,
    #[account(mut)]
    pub token_from: Account<'info, TokenAccount>,
    #[account(
        mut,
        seeds = [b"vault", token_mint.key().as_ref()],
        bump
    )]
    pub token_vault: Account<'info, TokenAccount>,
    #[account(mut)]
    pub x_token_to: Account<'info, TokenAccount>,

    #[account(
        init_if_needed,
        payer = user_authority,
        space = User::SIZE,
        seeds = [
           b"user", user_authority.key.as_ref(),
        ],
        bump
    )]
    user: Box<Account<'info, User>>,

    #[account(mut)]
    user_authority: Signer<'info>,
    ///used by anchor for init of the above
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
}

pub fn exe(ctx: Context<Stake>, amount: u64) -> Result<()> {
    let total_token = ctx.accounts.token_vault.amount;
    let total_x_token = ctx.accounts.x_token_mint.supply;

    ctx.accounts.user.owner = ctx.accounts.user_authority.key();
    ctx.accounts.user.staked_amount = ctx.accounts.user.staked_amount.checked_add(amount).unwrap();
    let now = Clock::get().unwrap().unix_timestamp;
    update_user_tier(&mut ctx.accounts.user, now);

    let token_mint_key = ctx.accounts.token_mint.key();
    let seeds = &[
        b"vault",
        token_mint_key.as_ref(),
        &[*ctx.bumps.get("token_vault").unwrap()],
    ];
    let signer = &[&seeds[..]];

    // mint xToken to user
    if total_token == 0 || total_x_token == 0 {
        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            token::MintTo {
                mint: ctx.accounts.x_token_mint.to_account_info(),
                to: ctx.accounts.x_token_to.to_account_info(),
                authority: ctx.accounts.token_vault.to_account_info(),
            },
            signer,
        );
        token::mint_to(cpi_ctx, amount)?;
    } else {
        let what: u64 = (amount as u128)
            .checked_mul(total_x_token as u128)
            .unwrap()
            .checked_div(total_token as u128)
            .unwrap()
            .try_into()
            .unwrap();

        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            token::MintTo {
                mint: ctx.accounts.x_token_mint.to_account_info(),
                to: ctx.accounts.x_token_to.to_account_info(),
                authority: ctx.accounts.token_vault.to_account_info(),
            },
            signer,
        );
        token::mint_to(cpi_ctx, what)?;
    }

    //transfer the users tokens to the vault
    let cpi_ctx = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        token::Transfer {
            from: ctx.accounts.token_from.to_account_info(),
            to: ctx.accounts.token_vault.to_account_info(),
            authority: ctx.accounts.user_authority.to_account_info(),
        },
    );
    token::transfer(cpi_ctx, amount)?;

    Ok(())
}
