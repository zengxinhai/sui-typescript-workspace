import { SuiTxBlock } from '@scallop-io/sui-kit'
import { suiKit } from './libs'

async function main() {
  const pkgId = '0x199d93b30c8a5e98af86adfec8fb9790b8da29b53cc36d7cb6fade69552e1ba2';
  const poolId = '0x640fbc3f42489aa17f6b27f068becaab7c78c6ae00fafa03251deec7f4afe5eb';
  const tx = new SuiTxBlock();
  // Now I have 100 coinB
  const [coinB_100, loanB] = tx.moveCall(
    `${pkgId}::dex::borrow_b`,
    [poolId, 100]
  );
  // 200 coinA
  const coinA_200 = tx.moveCall(
    `${pkgId}::dex::exchange_a`,
    [poolId, coinB_100]
  );
  // 200 coinB
  const coinB_200 = tx.moveCall(
    `${pkgId}::dex::exchange_b`,
    [poolId, coinA_200]
  );
  // Split into 2 coinB
  const [coinB_100_1] = tx.splitCoins(coinB_200, [100]);
  // repay the loan
  tx.moveCall(
    `${pkgId}::dex::repay_b`,
    [poolId, coinB_100_1, loanB]
  );
  tx.transferObjects([coinB_200], suiKit.currentAddress());
  return suiKit.signAndSendTxn(tx);
}

main().then(console.log).catch(console.error);
