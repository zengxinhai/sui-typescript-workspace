/** 1. 引入SUI SDK **/
import { TransactionBlock, RawSigner, Ed25519Keypair, JsonRpcProvider } from '@mysten/sui.js';

/** 2. 组织交易数据 **/
const tx = new TransactionBlock();
tx.transferObjects([tx.object('objectId')], tx.pure('sender'));

/** 3. 发送交易 **/
const secretKey = process.env.SECRET_KEY as string;
const keyPair = Ed25519Keypair.fromSecretKey(Buffer.from(secretKey, 'base64').slice(1));
const signer = new RawSigner(keyPair, provider);




async function main() {
  const sender = await signer.getAddress();
  const tx = new TransactionBlock();
  tx.transferObjects([tx.object(objectId)], tx.pure(sender));

  const res = await signer.signAndExecuteTransactionBlock({ transactionBlock: tx });
  return res;
}

main().then(console.log).then(console.error)

