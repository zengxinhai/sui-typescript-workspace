/**
 * A basic transaction：Transfer the ownership of an object to another address
 */
import dotenv from 'dotenv';
import {
  TransactionBlock,
  Ed25519Keypair,
  RawSigner,
  JsonRpcProvider,
  testnetConnection,
} from '@mysten/sui.js';
import {
  objectId
} from './sui-data/for-simple-tx'
dotenv.config();

// Initialization
const secretKey = process.env.SECRET_KEY as string;
const keyPair = Ed25519Keypair.fromSecretKey(Buffer.from(secretKey, 'base64').slice(1));
const provider = new JsonRpcProvider(testnetConnection);
const signer = new RawSigner(keyPair, provider);


async function main() {
  const sender = await signer.getAddress();
  const tx = new TransactionBlock();
  tx.transferObjects([tx.object(objectId)], tx.pure(sender));
  
  const res = await signer.signAndExecuteTransactionBlock({ transactionBlock: tx });
  return res;
}

main().then(console.log).then(console.error)

