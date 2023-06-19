import * as dotenv from "dotenv";
import {
  JsonRpcProvider,
  testnetConnection,
} from "@mysten/sui.js";
import { objectId } from "./sui-data/for-simple-tx"
dotenv.config();

async function main() {

  const counterId = '0x6fedcfc4f5671115590bbf8719e51be16f4ced3298ef5aeb80d7e39c35131d17';
  const displayId = '0x66c4f9e20c0d25b7e5e7533d2259e58ce36a7c9ffaf6e16179ad07b653b2e64c';
  const provider = new JsonRpcProvider(testnetConnection);
  const res = await provider.getObject({
    id: counterId,
    options: {
      showDisplay: true,
    }
  });
  const display = res.data?.display;
  console.log(display)
}

main().then(console.log).catch(console.error);
