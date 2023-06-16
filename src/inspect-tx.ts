/**
 * A example on how to inspect a transaction
 */
import dotenv from 'dotenv';
import {
  TransactionBlock,
  JsonRpcProvider,
  testnetConnection,
  bcs,
} from '@mysten/sui.js';
import { objectId } from './sui-data/for-simple-tx';
dotenv.config();


// Init provider
const provider = new JsonRpcProvider(testnetConnection);

async function main() {
  const pkgId = '0x74a1f74a31e92acef30474531b619aebb87b2505233e2764e43c83957e1fe7de';
  const moduleName = 'counter';
  const func = 'check_value';
  const counterId = '0x5f550559a20eaef2e009446be77bc640024c8e5770fe203ba781245b39ab449e';
  const tx = new TransactionBlock();
  tx.moveCall({
    target: `${pkgId}::${moduleName}::${func}`,
    arguments: [tx.object(counterId)]
  });
  const sender = '0x5b4d59ce49fe9edacaa944e774ed87ff4b763c621659a1c3bde7d02bd93b9929';
  const inspectRes = await provider.devInspectTransactionBlock({ transactionBlock: tx, sender });
  const results = inspectRes.results as any;
  const value = results[0].returnValues[0][0];
  return bcs.de('u64', Uint8Array.from(value));
}

main().then(console.log).catch(console.error);
