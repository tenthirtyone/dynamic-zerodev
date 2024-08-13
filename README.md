# Quickstart

Signup at [https://dashboard.zerodev.app/](https://dashboard.zerodev.app/) and [https://app.dynamic.xyz](https://app.dynamic.xyz)

### ZeroDev Dashboard

1. Copy your project id from the dashboard project home.

### Dynamic Dashboard Configuration

1. Under Configurations enable Account Abstraction, paste your ZeroDev Project Id from the ZeroDev dashboard.

2. In Chains & Networks enable Sepolia

3. Under Security enable cors from http://localhost:3000

4. Under Log in & User Profile enable the authentication strategies you want to use.

5. Under Developers > SDK & API Keys copy your environment id to the .env file in `packages/nextjs`

6. Under Embedded Wallets > Wallet Transactions MFA enable Passkey and click the settings icon. Enable Required at Signup.

### Application

1. `yarn`

2. `yarn start`

### Login

1. Login with Email through the Dynamic Widget in the top right corner.

Dynamic will create an EOA in Turnkey and calculate your deterministic Smart Account address. Your Smart Account address is the address in the dynamic widget.

Enable a Passkey

2. Acquire some Sepolia testnet ether, send it to your Smart Account address.

## Files

The DynamicWidget used for Authentication lives in:
`packages/nextjs/app/page.tsx`

An example of getting the Dynamic Wallet Client lives in:
`packages/nextjs/app/SignerAddress.tsx`

An example of getting the ZeroDev ecdsaProvider lives in:
`packages/nextjs/app/Recovery.tsx`

## Notes & References

Dynamic does not directly implement the recovery features of the ZeroDev Kernel (Smart Account)

Dynamic relies on v4 of the ZeroDev SDK [docs](https://docs-v4.zerodev.app/)

We let Dynamic initialize the ZeroDev ECDSAProvider and then use the provider to interact directly with the recovery functions

The Event emission for OwnerChanged in Etherscan incorrectly identifies the params as (address oldOwner, address newOwner, address sender). The correct params are (address kernel, address oldOwner, address sender). This is because the Kernel contract/proxies are not verified but the OwnerChanged(address, address, address) function signature is defined and known and Etherscan is attempting to guess at correctness.
