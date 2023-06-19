import { RawSigner, Ed25519Keypair, JsonRpcProvider, testnetConnection } from '@mysten/sui.js';

const secretKey = 'secret key xxx'; // base64密钥
const keyPair = Ed25519Keypair.fromSecretKey(Buffer.from(secretKey, 'base64').slice(1));
const provider = new JsonRpcProvider(testnetConnection);
export const signer = new RawSigner(keyPair, provider);

/** 1. 引入SUI SDK **/
import { TransactionBlock } from '@mysten/sui.js';

/** 2. 组织交易数据 **/
const tx = new TransactionBlock();
tx.transferObjects([tx.object('objectId')], tx.pure('sender'));

/** 3. 发送交易 **/
signer.signAndExecuteTransactionBlock({ transactionBlock: tx }).then();

