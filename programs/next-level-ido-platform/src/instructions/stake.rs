use crate::state::{PriceChange, User};
use crate::utils::{get_price, mint_to};
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount};
use std::convert::TryInto;

#[derive(Accounts)]
#[instruction(mint_bump: u8)]
pub struct Stake<'info> {
    pub token_mint: Account<'info, Mint>,
    #[account(
        mut,
        seeds = [b"mint", token_mint.key().as_ref()],
        bump = mint_bump
    )]
    pub x_token_mint: Account<'info, Mint>,
    #[account(mut)]
    pub token_from: Account<'info, TokenAccount>,
    // #[account(mut)]
    // pub token_from_authority: Signer<'info>,
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
        payer = initializer,
        space = User::SIZE,
        seeds = [
           b"user", initializer.key.as_ref(),
        ],
        bump
    )]
    user: Box<Account<'info, User>>,

    #[account(mut)]
    initializer: Signer<'info>,
    ///used by anchor for init of the above
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
}

pub fn exe(ctx: Context<Stake>, mint_bump: u8, amount: u64) -> Result<()> {
    let total_token = ctx.accounts.token_vault.amount;
    let total_x_token = ctx.accounts.x_token_mint.supply;
    let old_price = get_price(&ctx.accounts.token_vault, &ctx.accounts.x_token_mint);

    ctx.accounts.user.staked_amount = ctx.accounts.user.staked_amount.checked_add(amount).unwrap();

    if total_token == 0 || total_x_token == 0 {
        mint_to(
            &ctx.accounts.token_program.to_account_info(),
            &ctx.accounts.x_token_mint.to_account_info(),
            &ctx.accounts.x_token_to.to_account_info(),
            &ctx.accounts.token_mint.to_account_info(),
            mint_bump,
            amount,
        )?;
    } else {
        let what: u64 = (amount as u128)
            .checked_mul(total_x_token as u128)
            .unwrap()
            .checked_div(total_token as u128)
            .unwrap()
            .try_into()
            .unwrap();
        mint_to(
            &ctx.accounts.token_program.to_account_info(),
            &ctx.accounts.x_token_mint.to_account_info(),
            &ctx.accounts.x_token_to.to_account_info(),
            &ctx.accounts.token_mint.to_account_info(),
            mint_bump,
            what,
        )?;
    }

    //transfer the users tokens to the vault
    let cpi_ctx = CpiContext::new(
        ctx.accounts.token_program.to_account_info(),
        token::Transfer {
            from: ctx.accounts.token_from.to_account_info(),
            to: ctx.accounts.token_vault.to_account_info(),
            authority: ctx.accounts.initializer.to_account_info(),
        },
    );
    token::transfer(cpi_ctx, amount)?;

    (&mut ctx.accounts.token_vault).reload()?;
    (&mut ctx.accounts.x_token_mint).reload()?;

    let new_price = get_price(&ctx.accounts.token_vault, &ctx.accounts.x_token_mint);

    emit!(PriceChange {
        old_step_per_xstep_e9: old_price.0,
        old_step_per_xstep: old_price.1,
        new_step_per_xstep_e9: new_price.0,
        new_step_per_xstep: new_price.1,
    });

    Ok(())
}
