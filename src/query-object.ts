import * as dotenv from "dotenv";
import {
  JsonRpcProvider,
  testnetConnection,
} from "@mysten/sui.js";
import { objectId } from "./sui-data/for-simple-tx"
dotenv.config();

async function main() {

  const provider = new JsonRpcProvider(testnetConnection);
  return provider.getObject({
    id: objectId
  });
}

main().then(console.log).catch(console.error);
