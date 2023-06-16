import { SuiTxBlock } from '@scallop-io/sui-kit'
import { suiKit } from './libs'

async function main() {
  const tx = new SuiTxBlock();
  tx.transferSui(suiKit.currentAddress(), 100);
  return suiKit.signAndSendTxn(tx);
}

main().then(console.log).catch(console.error)

