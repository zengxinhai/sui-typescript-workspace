import * as dotenv from "dotenv";
import {
  JsonRpcProvider,
  mainnetConnection,
} from "@mysten/sui.js";
import { objectId } from "./sui-data/for-simple-tx"
dotenv.config();

async function main() {
  
  const provider = new JsonRpcProvider(mainnetConnection);
  const coinType = '0x5d4b302506645c37ff133b98c4b50a5ae14841659738d6d733d59d0d217a93bf::coin::COIN';
  return provider.getCoinMetadata({
    coinType
  });
}

main().then(console.log).catch(console.error);
