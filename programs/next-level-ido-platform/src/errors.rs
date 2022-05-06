use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("u128 cannot be converted into u64")]
    U128CannotConvert,
}
