use crate::state::{Log, StakeTier, User};
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, TokenAccount};
use std::convert::TryInto;
use std::ops::Deref;

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

fn get_tier_by_amount(amount: u64) -> StakeTier {
    // TODO find a better way plz
    if amount >= (StakeTier::Dimond.value().0 as u64) {
        return StakeTier::Dimond;
    }
    if amount >= (StakeTier::Platium.value().0 as u64) {
        return StakeTier::Platium;
    }
    if amount >= (StakeTier::Gold.value().0 as u64) {
        return StakeTier::Gold;
    }
    if amount >= (StakeTier::Silver.value().0 as u64) {
        return StakeTier::Silver;
    }
    if amount >= (StakeTier::Brone.value().0 as u64) {
        return StakeTier::Brone;
    }
    StakeTier::NoTier
}

pub fn update_user_tier<'info>(user: &mut Account<'info, User>, current_ts: i64) {
    let staked_amount = user.staked_amount;

    let next_tier = get_tier_by_amount(staked_amount);
    emit!(Log {
        message: format!(
            "update_user_tier {}, next tier: {:?}, current tier: {:?}",
            staked_amount, next_tier, user.tier
        )
    });
    if next_tier != user.tier {
        user.tier = next_tier;
        user.last_stake_ts = current_ts;
    }
}

pub trait TrimAsciiWhitespace {
    /// Trim ascii whitespace (based on `is_ascii_whitespace()`) from the
    /// start and end of a slice.
    fn trim_ascii_whitespace(&self) -> &[u8];
}

impl<T: Deref<Target = [u8]>> TrimAsciiWhitespace for T {
    fn trim_ascii_whitespace(&self) -> &[u8] {
        let from = match self.iter().position(|x| !x.is_ascii_whitespace()) {
            Some(i) => i,
            None => return &self[0..0],
        };
        let to = self.iter().rposition(|x| !x.is_ascii_whitespace()).unwrap();
        &self[from..=to]
    }
}
