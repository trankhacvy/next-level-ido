use crate::*;
use borsh::{BorshDeserialize, BorshSerialize};

pub const SECONDS_IN_YEAR: i32 = 365 * 24 * 60 * 40;

pub enum PoolVersion {
    V1 = 1,
    V2 = 2
}

// impl PoolVersion {
//     pub fn upgrade_if_needed(&mut self) {
//         if self.ve
//     }
// }