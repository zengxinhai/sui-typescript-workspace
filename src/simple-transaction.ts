// 引入sui官方sdk
import {
  Transactions,
  TransactionBlock,
  Ed25519Keypair,
  JsonRpcProvider,
  RawSigner,
  testnetConnection,
  SuiObjectRef,
} from "@mysten/sui.js"

import { gasCoin1, gasCoin2, obj1, obj2, ObjectCallArg } from "./sui-data/objects"



async function main() {

  // 初始化
  const secretKey = Buffer.from('AONOr9SfnOFFGAjHiBPALiWFh+HrtVOh9S/0OGcZOKre', 'base64').slice(1);
  const provider = new JsonRpcProvider(testnetConnection);
  const keyPair = Ed25519Keypair.fromSecretKey(secretKey);
  const signer = new RawSigner(keyPair, provider);
  const sender = await signer.getAddress();

  const transferObj = async(obj: ObjectCallArg, gasCoin: SuiObjectRef) => {
    const txBlock = new TransactionBlock();
    txBlock.transferObjects([txBlock.object(obj)], txBlock.pure(sender));
    txBlock.setGasPayment([gasCoin]);
    txBlock.setGasPrice(1100);
    txBlock.setGasBudget(10 ** 7); // 0.01SUI
    txBlock.setSender(sender);
    const txBytes = await txBlock.build({ provider, onlyTransactionKind: false });
    const res = await signer.signAndExecuteTransactionBlock({transactionBlock: txBytes});
    console.log(res)
  }

  const res = await Promise.all([
    transferObj(obj1, gasCoin1),
    transferObj(obj2, gasCoin2),
  ]);
  return res;
}

main().then(console.log).catch(console.error);