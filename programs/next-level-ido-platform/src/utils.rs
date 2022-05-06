use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, TokenAccount};
use std::convert::TryInto;

pub fn mint_to<'info>(
    token_program: &AccountInfo<'info>,
    mint: &AccountInfo<'info>,
    to: &AccountInfo<'info>,
    seed_account: &AccountInfo<'info>,
    mint_bump: u8,
    amount: u64,
) -> Result<()> {
    let token_mint_key = seed_account.key();
    let seeds = &[b"mint", token_mint_key.as_ref(), &[mint_bump]];
    let signer = &[&seeds[..]];

    let cpi_ctx = CpiContext::new_with_signer(
        token_program.clone(),
        token::MintTo {
            mint: mint.clone(),
            to: to.clone(),
            authority: mint.clone(),
        },
        signer,
    );

    token::mint_to(cpi_ctx, amount)?;
    Ok(())
}

pub fn get_price<'info>(
    vault: &Account<'info, TokenAccount>,
    mint: &Account<'info, Mint>,
) -> (u64, String) {
    let total_token = vault.amount;
    let total_x_token = mint.supply;

    if total_x_token == 0 {
        return (0, String::from("0"));
    }

    let price_uint = (total_token as u128)
        .checked_mul((10 as u64).pow(mint.decimals as u32) as u128)
        .unwrap()
        .checked_div(total_x_token as u128)
        .unwrap()
        .try_into()
        .unwrap();

    let price_float = (total_token as f64) / (total_x_token as f64);
    return (price_uint, price_float.to_string());
}
