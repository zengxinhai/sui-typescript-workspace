// 引入sui官方sdk
import {
  Transactions,
  TransactionBlock,
  Ed25519Keypair,
  JsonRpcProvider,
  RawSigner,
  testnetConnection,
  SuiObjectRef,
  SUI_TYPE_ARG,
} from "@mysten/sui.js"

import type { ObjectCallArg, PureCallArg } from "@mysten/sui.js"

async function main() {

  // 初始化
  const secretKey = Buffer.from('AONOr9SfnOFFGAjHiBPALiWFh+HrtVOh9S/0OGcZOKre', 'base64').slice(1);
  const provider = new JsonRpcProvider(testnetConnection);
  const keyPair = Ed25519Keypair.fromSecretKey(secretKey);
  const signer = new RawSigner(keyPair, provider);
  const sender = await signer.getAddress();

  const StructType = '0x2::coin::Coin<0x96f98f84c2d351fe152eebb3b937897d33bae6ee07ae8f60028dca16952862cd::eth::ETH>';
  const objs = await provider.getOwnedObjects({
    owner: sender,
    filter: {
      StructType
    },
  })
  console.log(objs.data)
}

main().then(console.log).catch(console.error);
