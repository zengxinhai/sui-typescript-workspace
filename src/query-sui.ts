// 引入sui官方sdk
import * as dotenv from "dotenv";
import {
  Transactions,
  TransactionBlock,
  Ed25519Keypair,
  JsonRpcProvider,
  RawSigner,
  testnetConnection,
  SuiObjectRef,
  SUI_TYPE_ARG,
} from "@mysten/sui.js";
dotenv.config();

async function main() {

  // 初始化
  const secretKey = process.env.SECRET_KEY as string;
  const provider = new JsonRpcProvider(testnetConnection);
  const keyPair = Ed25519Keypair.fromSecretKey(Buffer.from(secretKey, 'base64').slice(1));
  const signer = new RawSigner(keyPair, provider);
  const sender = await signer.getAddress();

  const StructType = `0x2::coin::Coin<${SUI_TYPE_ARG}>`;
  const objs = await provider.getOwnedObjects({
    owner: sender,
    filter: {
      StructType
    },
  })
  console.log(objs.data)
}

main().then(console.log).catch(console.error);
