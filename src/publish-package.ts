import * as path from "path";
import { packagePublisher, suiKit } from "./libs"

async function main() {
  const signer = suiKit.getSigner();
  const pkgPath = path.join(__dirname, '../move/counter');
  return packagePublisher.publishPackage(pkgPath, signer);
}

main().then(console.log).catch(console.error);
