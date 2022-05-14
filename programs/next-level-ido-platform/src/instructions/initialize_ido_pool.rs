use crate::errors::ErrorCode;
use crate::state::{IdoPool, IdoTimes};
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};

const DECIMALS: u8 = 9;

#[derive(Accounts)]
#[instruction(ido_name: String)]
pub struct InitializeIdoPool<'info> {
    // IDO Authority accounts
    #[account(mut)]
    pub ido_authority: Signer<'info>,

    #[account(mut,
        constraint = ido_authority_token.owner == ido_authority.key(),
        constraint = ido_authority_token.mint == ido_token_mint.key())]
    pub ido_authority_token: Box<Account<'info, TokenAccount>>,

    // IDO Accounts
    #[account(
        init,
        payer = ido_authority,
        space = IdoPool::SIZE,
        seeds = [ido_name.as_bytes()],
        bump,
    )]
    pub ido_pool: Box<Account<'info, IdoPool>>,

    // ido token
    // #[account(constraint = watermelon_mint.key() == ido_authority_watermelon.mint)]
    pub ido_token_mint: Box<Account<'info, Mint>>,
    // vault to hold ido token
    #[account(init,
        token::mint = ido_token_mint,
        token::authority = ido_pool,
        seeds = [ido_name.as_bytes(), b"ido_token_vault"],
        bump,
        payer = ido_authority
    )]
    pub ido_token_vault: Box<Account<'info, TokenAccount>>,

    // redeemable_mint
    #[account(init,
        mint::decimals = DECIMALS,
        mint::authority = ido_pool,
        seeds = [ido_name.as_bytes(), b"redeemable_mint".as_ref()],
        bump,
        payer = ido_authority
    )]
    pub redeemable_mint: Box<Account<'info, Mint>>,

    // TODO Confirm USDC mint address on mainnet or leave open as an option for other stables
    #[account(constraint = usdc_mint.decimals == DECIMALS)]
    pub usdc_mint: Box<Account<'info, Mint>>,

    #[account(init,
        token::mint = usdc_mint,
        token::authority = ido_pool,
        seeds = [ido_name.as_bytes(), b"usdc_vault"],
        bump,
        payer = ido_authority
    )]
    pub usdc_vault: Box<Account<'info, TokenAccount>>,

    ///used by anchor for init of the above
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
}

#[access_control(validate_ido_times(ido_times))]
pub fn exe(
    ctx: Context<InitializeIdoPool>,
    ido_name: String,
    initial_token_amount: u64,
    ido_times: IdoTimes,
) -> Result<()> {
    msg!("INITIALIZE POOL");

    let ido_pool = &mut ctx.accounts.ido_pool;

    let name_bytes = ido_name.as_bytes();
    let mut name_data = [b' '; 10];
    name_data[..name_bytes.len()].copy_from_slice(name_bytes);

    ido_pool.ido_name = name_data;
    ido_pool.ido_authority = ctx.accounts.ido_authority.key();

    ido_pool.usdc_token_mint = ctx.accounts.usdc_mint.key();
    ido_pool.redeemable_token_mint = ctx.accounts.redeemable_mint.key();
    ido_pool.ido_token_mint = ctx.accounts.ido_token_mint.key();

    ido_pool.usdc_vault = ctx.accounts.usdc_vault.key();
    ido_pool.ido_token_vault = ctx.accounts.ido_token_vault.key();

    ido_pool.ido_token_amount = initial_token_amount;
    ido_pool.ido_times = ido_times;

    // Tranfer IDO Token from creator to IDO token vault
    let cpi_accounts = Transfer {
        from: ctx.accounts.ido_authority_token.to_account_info(),
        to: ctx.accounts.ido_token_vault.to_account_info(),
        authority: ctx.accounts.ido_authority.to_account_info(),
    };
    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
    token::transfer(cpi_ctx, initial_token_amount)?;

    Ok(())
}

fn validate_ido_times(ido_times: IdoTimes) -> Result<()> {
    let clock = Clock::get()?;
    if ido_times.start_ido <= clock.unix_timestamp {
        return err!(ErrorCode::IdoFuture);
    }
    if !(ido_times.start_ido < ido_times.end_deposits
        && ido_times.end_deposits < ido_times.end_ido
        && ido_times.end_ido < ido_times.end_escrow)
    {
        return err!(ErrorCode::SeqTimes);
    }

    Ok(())
}
