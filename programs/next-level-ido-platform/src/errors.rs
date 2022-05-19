use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("u128 cannot be converted into u64")]
    U128CannotConvert,
    // ido times
    #[msg("IDO must start in the future")]
    IdoFuture,
    #[msg("IDO times are non-sequential")]
    SeqTimes,
    // 
    #[msg("Your are not whitelist")]
    NotWhitelist,

    #[msg("Insufficient USDC")]
    LowUsdc,
}
