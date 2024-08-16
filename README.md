# Start

```javascript
npm install
npm run start
```

1. Copy the `.env-example` to .env

2. Signup at zeroDev and copy the project id, paymaster and bundler urls to the .env file

Add a gas policy (ex. 1 ETH per minute), make sure your project is on Sepolia.

3. Signup at Dynamic and copy your project id from their dashboard.

Enable Sepolia

Enable http://localhost:3000 CORS origin

4. The `main` branch contains the dynamic signer example. The `ecdsa-recovery` branch contains a simpler example with a private key read from the .env file.

5. The example will send two transactions.

The first transaction will send 2 internal tx to the smart account address. One to create the Kernel Smart Account, set the owner to the dynamic/ecdsa account and create a guardian recovery address. The second to perform recovery

Example Sepolia TX Hash: 0xab00fa580ce1ebe8280dc18fe0baf79ee76470afd75bbef8b41b6c91273c2e67

The second transaction will send a benign UserOp from the new owner set by the guardian recovery.

Example Sepolia TX Hash: 0x469a1a282b58817e653438eb3a13f75409cf4bb69388f2160801de1da8c020f5
