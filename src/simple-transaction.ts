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

async function main() {

// 初始化
  const secretKey = Buffer.from("0x0");
  const provider = new JsonRpcProvider(testnetConnection);
  const keyPair = Ed25519Keypair.fromSecretKey(secretKey);
  const signer = new RawSigner(keyPair, provider);

// 构造交易
  const obj: SuiObjectRef = { objectId: '', digest: '', version: '' };
  const tx = Transactions.TransferObjects(
    [{ kind: 'Input', value: obj, type: 'object', index: 0 }],
    { kind: 'Input', value: '0x0', index: 0 }
  );
  const txBlock = new TransactionBlock();
  txBlock.add(tx);

// 设置手续费
  const gasCoins: SuiObjectRef[] = [
    {objectId: '', digest: '', version: ''}
  ];
  txBlock.setGasPayment(gasCoins);
  txBlock.setGasPrice(900);
  txBlock.setGasBudget(10 ** 8); // 0.1SUI

// 序列化交易
  const txBytes = await txBlock.build();

// 发送交易
  const res = await signer.signAndExecuteTransactionBlock({transactionBlock: txBytes});
}
