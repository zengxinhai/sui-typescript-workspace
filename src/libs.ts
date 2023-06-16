import dotenv from "dotenv";
import { SuiKit } from "@scallop-io/sui-kit";
import { SuiAdvancePackagePublisher } from "@scallop-io/sui-package-kit";

dotenv.config();

export const secretKey = process.env.SECRET_KEY || '';
export const networkType = 'testnet';
export const suiKit = new SuiKit({ secretKey, networkType });

export const packagePublisher = new SuiAdvancePackagePublisher({ networkType });
