// use crate::errors::ErrorCode;
use crate::state::IdoPool;
use anchor_lang::prelude::*;

// TODO comment for demo day =))
pub fn whilelist_phase(_ido_pool: &IdoPool) -> Result<()> {
    // let clock = Clock::get()?;
    // if clock.unix_timestamp < ido_pool.ido_times.whitelist_start {
    //     return err!(ErrorCode::StartWhitelistTime);
    // } else if ido_pool.ido_times.whitelist_end <= clock.unix_timestamp {
    //     return err!(ErrorCode::EndWhitelistTime);
    // }
    Ok(())
}

// TODO comment for demo day =))
pub fn ido_over(_ido_account: &IdoPool) -> Result<()> {
    // let clock = Clock::get()?;
    // if clock.unix_timestamp <= ido_account.ido_times.sale_end {
    //     return err!(ErrorCode::IdoNotOver);
    // }
    Ok(())
}