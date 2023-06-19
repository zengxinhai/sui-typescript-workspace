import { SuiTxBlock } from '@scallop-io/sui-kit'
import { suiKit } from './libs'
import { borrowA, aToB, bToC, cToA, repayA } from './defi/defi/dex/functions'

async function main() {
  const poolId = '0xd0188795e57981f17a4b98c0c602a073b4dc09c6c8abe07e648de8b6e015361a';
  const tx = new SuiTxBlock();
  // Now I have 100 coinA
  const [coinA, loanA] = borrowA(tx.txBlock, { pool: poolId, u64: BigInt(100) })
  // swap 100 coinA to 200 coinB
  const coinB_100 = aToB(tx.txBlock, { pool: poolId, coin: coinA })
  // swap 200 coinB to 200 coinC
  const coinC_200 = bToC(tx.txBlock, { pool: poolId, coin: coinB_100 })
  // swap 200 coinC to 200 coinA
  const coinA_back = cToA(tx.txBlock, { pool: poolId, coin: coinC_200 })
  // split 100 coinA from 200 coinA
  const [coinA_100] = tx.splitCoins(coinA_back, [100])
  // repay 100 coinA
  repayA(tx.txBlock, { pool: poolId, coin: coinA_100, flashLoanA: loanA })
  // transfer the rest 100 coinA to my address
  tx.transferObjects([coinA_back], suiKit.currentAddress());

  return suiKit.signAndSendTxn(tx);
}

main().then(console.log).catch(console.error);
