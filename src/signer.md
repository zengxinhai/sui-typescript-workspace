```typescript
import { RawSigner, Ed25519Keypair, JsonRpcProvider, testnetConnection } from '@mysten/sui.js';

const secretKey = 'secret key xxx'; // base64密钥
const keyPair = Ed25519Keypair.fromSecretKey(Buffer.from(secretKey, 'base64').slice(1));
const provider = new JsonRpcProvider(testnetConnection);
export const signer = new RawSigner(keyPair, provider);
```

```typescript
// @flow
import * as React from 'react';

type Props = {
  
};

export function Signer(props: Props) {
  return (
    <div>

      </div>
  );
};
```