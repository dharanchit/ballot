import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { HotOrNot } from '../target/types/hot_or_not';
const { SystemProgram } = anchor.web3;
import assert from 'assert'   ;

describe('hot-or-not', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  const program = anchor.workspace.HotOrNot as Program<HotOrNot>;
  const voteAccount = anchor.web3.Keypair.generate();

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.rpc.initialize({
      accounts: {
        voteAccount: voteAccount.publicKey,
        user: anchor.Provider.env().wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [voteAccount],
    });

    const account = await program.account.voteAccount.fetch(voteAccount.publicKey);

    console.log("Hot: ", account.hot.toString());
    console.log("Not: ", account.not.toString());
    assert.ok(
      account.hot.toString().length == 0 && account.not.toString().length == 0
    );
  });
  it("Votes correctly for hot", async () => {
    console.log("Testing Hot");
    await program.rpc.voteHot({
      accounts: {
        voteAccount: voteAccount.publicKey,
      }
    });
    const account = await program.account.voteAccount.fetch(
      voteAccount.publicKey
    );
    console.log("Hot:", account.hot.toString());
    console.log("Not:", account.not.toString());
    assert.ok(
      account.hot.toString().length == 1 && account.not.toString().length == 0
    );
  });
  it("Votes correctly for not", async () => {
    console.log("Tesing Not");
    await program.rpc.voteNot({
      accounts: {
        voteAccount: voteAccount.publicKey,
      },
    });
    const account = await program.account.voteAccount.fetch(
      voteAccount.publicKey
    );
    console.log("Hot:", account.hot.toString());
    console.log("Not:", account.not.toString());
    assert.ok(
      account.hot.toString().length == 1 && account.not.toString().length == 1
    )
  })
});
