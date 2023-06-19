import { SUI_CLOCK_OBJECT_ID } from '@mysten/sui.js'
import { SuiTxBlock } from '@scallop-io/sui-kit'
import { suiKit } from './libs'

async function main() {
  const tx = new SuiTxBlock();
  const pkgId = '0xf6c38ee82eccf9fb8d3565e046a8521f9b1655cd981f97cb2f9b48e7cbcceb91';
  const counterId = '0x6fedcfc4f5671115590bbf8719e51be16f4ced3298ef5aeb80d7e39c35131d17';
  tx.moveCall(
    `${pkgId}::counter::add`,
    [counterId, SUI_CLOCK_OBJECT_ID],
  );
  return suiKit.signAndSendTxn(tx);
}
main().then(console.log).catch(console.error);