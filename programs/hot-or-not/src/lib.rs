use anchor_lang::prelude::*;

declare_id!("566YvE5muijBEm4uLdxYckYAbYKkvADyhi2MoLi1X4E4");

#[program]
pub mod hot_or_not {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        let vote_account = &mut ctx.accounts.vote_account;
        vote_account.hot = 0;
        vote_account.not = 0;
        Ok(())
    }

    pub fn vote_hot(ctx: Context<Vote>) -> ProgramResult {
        let vote_account = &mut ctx.accounts.vote_account;
        vote_account.hot += 1;
        Ok(())
    }

    pub fn vote_not(ctx: Context<Vote>) -> ProgramResult {
        let vote_account = &mut ctx.accounts.vote_account;
        vote_account.not += 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space= 16 + 16)]
    pub vote_account: Account<'info, VoteAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program <'info, System>
}
#[derive(Accounts)]
pub struct Vote<'info>{
    #[account(mut)]
    pub vote_account: Account<'info, VoteAccount>
}

#[account]
pub struct VoteAccount {
    pub hot: u64,
    pub not: u64
}
