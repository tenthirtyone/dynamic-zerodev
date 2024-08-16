import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

import {
  createKernelAccount,
  createZeroDevPaymasterClient,
  createKernelAccountClient,
} from "@zerodev/sdk";
import {
  ENTRYPOINT_ADDRESS_V07,
  bundlerActions,
  walletClientToSmartAccountSigner,
} from "permissionless";
import {
  http,
  createPublicClient,
  parseAbi,
  encodeFunctionData,
  zeroAddress,
} from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import {
  createWeightedECDSAValidator,
  getRecoveryAction,
} from "@zerodev/weighted-ecdsa-validator";
import {
  getValidatorAddress,
  signerToEcdsaValidator,
} from "@zerodev/ecdsa-validator";
import { KERNEL_V3_1 } from "@zerodev/sdk/constants";

const Main = () => {
  const { primaryWallet } = useDynamicContext();
  const publicClient = createPublicClient({
    transport: http(process.env.REACT_APP_BUNDLER_RPC, {
      timeout: 60_000,
    }),
  });

  // see `ecdsa-recovery` branch, interchangeable with smartAccountSigner below.
  //const oldSigner = privateKeyToAccount(generatePrivateKey());
  // Arbitrary new owner account
  const newSigner = privateKeyToAccount(generatePrivateKey());
  // Arbitrary account for recovery
  const guardian = privateKeyToAccount(generatePrivateKey());

  const entryPoint = ENTRYPOINT_ADDRESS_V07;
  const recoveryExecutorFunction =
    "function doRecovery(address _validator, bytes calldata _data)";

  const doRecovery = async () => {
    const dynamicWalletClient =
      await primaryWallet?.connector?.getWalletClient();
    const smartAccountSigner = await walletClientToSmartAccountSigner(
      dynamicWalletClient
    );
    // A ZeroDev validator is the interface between the eoa/signer options
    const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
      signer: smartAccountSigner,
      entryPoint,
      kernelVersion: KERNEL_V3_1,
    });

    // As ecdsaValidator, except this account will be used for the recovery action
    // multiple guardians can be set on an account with there own respective weights.
    // To perform recovery the combined guardian weight must cross the threshold value.
    const guardianValidator = await createWeightedECDSAValidator(publicClient, {
      entryPoint,
      config: {
        threshold: 100,
        signers: [{ address: guardian.address, weight: 100 }],
      },
      signers: [guardian],
      kernelVersion: KERNEL_V3_1,
    });

    // This is the counterfactual Kernel Smart Account.
    // account.address represents the determinstic counterfactual on-chain address.
    const account = await createKernelAccount(publicClient, {
      entryPoint,
      plugins: {
        sudo: ecdsaValidator,
        regular: guardianValidator,
        action: getRecoveryAction(entryPoint),
      },
      kernelVersion: KERNEL_V3_1,
    });

    const paymasterClient = createZeroDevPaymasterClient({
      chain: sepolia,
      transport: http(process.env.REACT_APP_PAYMASTER_RPC, {
        timeout: 60_000,
      }),
      entryPoint,
    });

    // This is the counterfactual Smart Account client.
    const kernelClient = createKernelAccountClient({
      account,
      chain: sepolia,
      entryPoint,
      bundlerTransport: http(process.env.REACT_APP_BUNDLER_RPC, {
        timeout: 60_000,
      }),
      middleware: {
        sponsorUserOperation: paymasterClient.sponsorUserOperation,
      },
    });

    console.log("performing recovery...");

    // This is the second internal tx, the recovery operation.
    const userOpHash = await kernelClient.sendUserOperation({
      userOperation: {
        callData: encodeFunctionData({
          abi: parseAbi([recoveryExecutorFunction]),
          functionName: "doRecovery",
          args: [
            getValidatorAddress(entryPoint, KERNEL_V3_1),
            newSigner.address,
          ],
        }),
      },
    });

    console.log("recovery userOp hash:", userOpHash);

    // The bundler/offchain mempool will send the transaction to the entry point
    const bundlerClient = kernelClient.extend(bundlerActions(entryPoint));
    const { receipt } = await bundlerClient.waitForUserOperationReceipt({
      hash: userOpHash,
      timeout: 60_000,
    });

    console.log("recovery completed!");
    console.log(`tx hash: ${receipt.transactionHash}`);

    // This is the beginning of the second transaction, the new owner will send a benign transaction
    const newEcdsaValidator = await signerToEcdsaValidator(publicClient, {
      signer: newSigner,
      entryPoint,
      kernelVersion: KERNEL_V3_1,
    });

    const newAccount = await createKernelAccount(publicClient, {
      deployedAccountAddress: account.address,
      entryPoint,
      plugins: {
        sudo: newEcdsaValidator,
      },
      kernelVersion: KERNEL_V3_1,
    });

    const newKernelClient = createKernelAccountClient({
      entryPoint,
      account: newAccount,
      chain: sepolia,
      bundlerTransport: http(process.env.REACT_APP_BUNDLER_RPC, {
        timeout: 60_000,
      }),
      middleware: {
        sponsorUserOperation: paymasterClient.sponsorUserOperation,
      },
    });

    console.log(newKernelClient);

    console.log("sending userOp with new signer");
    // Send a 0 amount to the Zero Address with empty data, a benign tx to demonstrate the new owner
    const userOpHash2 = await newKernelClient.sendUserOperation({
      userOperation: {
        callData: await newAccount.encodeCallData({
          to: zeroAddress,
          value: 0n,
          data: "0x",
        }),
      },
    });
    console.log("userOp hash:", userOpHash2);

    const { receipt: receipt2 } =
      await bundlerClient.waitForUserOperationReceipt({
        hash: userOpHash2,
        timeout: 60_000,
      });
    console.log("userOp completed!");
    console.log(`tx hash: ${receipt2.transactionHash}`);
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center">
            <img src="/logo.png" alt="logo" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Onboard the world</h1>
        <p className="text-lg mb-16">
          Web3 login for <span className="text-blue-400">everyone</span>.
        </p>
        <DynamicWidget />
        <button
          onClick={doRecovery}
          style={{
            backgroundColor: "#008844",
            color: "white",
            padding: "10px 20px",
            margin: "10px 20px",
          }}
        >
          Run Example
        </button>
      </div>
      <div className="flex mt-16 space-x-4 ">
        <a
          href="https://docs.dynamic.xyz/"
          target="_blank"
          rel="noreferrer"
          className="p-4 inline-flex items-center justify-center rounded-lg border-2 border-[#3B3636] shadow-lg w-64"
        >
          <h2 className="font-semibold">Docs</h2>
        </a>
        <a
          href="https://demo.dynamic.xyz/"
          target="_blank"
          rel="noreferrer"
          className="p-4 inline-flex items-center justify-center border-2 border-[#3B3636] rounded-lg shadow-lg w-64"
        >
          <h2 className="font-semibold">Demo</h2>
        </a>
        <a
          href="https://app.dynamic.xyz/"
          target="_blank"
          rel="noreferrer"
          className="p-4 inline-flex items-center justify-center border-2 border-[#3B3636] rounded-lg shadow-lg w-64"
        >
          <h2 className="font-semibold">Dashboard</h2>
        </a>
      </div>
    </div>
  );
};

export default Main;
