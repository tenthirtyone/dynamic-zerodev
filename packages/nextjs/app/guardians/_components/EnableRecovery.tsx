"use client";

import { useState } from "react";
import { RecoveryProvider } from "@zerodev/sdk";
import useECDSAProvider from "~~/hooks/me/useECDSAProvider";

type EthereumAddress = `0x${string}`;

const EnableRecovery = () => {
  const { ecdsaProvider } = useECDSAProvider();
  const [guardianAddress, setGuardianAddress] = useState("0x0");
  const [_recoveryEnabled, setRecoveryEnabled] = useState(false);

  async function enableRecovery() {
    if (!ecdsaProvider || !process.env.NEXT_PUBLIC_ZERO_DEV_PROJECT_ID) return null;

    const recoveryData = {
      guardians: {
        [guardianAddress]: 1,
      },
      threshold: 1,
      delaySeconds: 0,
    };

    try {
      const recoveryProvider = await RecoveryProvider.init({
        projectId: process.env.NEXT_PUBLIC_ZERO_DEV_PROJECT_ID,
        defaultProvider: ecdsaProvider,
        opts: {
          validatorConfig: {
            ...recoveryData,
          },
        },
      });

      const result = await recoveryProvider.enableRecovery();
      await recoveryProvider.waitForUserOperationTransaction(result.hash as any);

      console.log("Recovery enabled");
      console.log(result.hash);
      setRecoveryEnabled(true);
    } catch (e: any) {
      setRecoveryEnabled(true);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter new owner address"
        value={guardianAddress}
        onChange={e => setGuardianAddress(e.target.value as EthereumAddress)}
      />
      <br />
      <button onClick={enableRecovery}>Enable Recovery</button>
      Recovery Enabled: {_recoveryEnabled}
    </div>
  );
};

export default EnableRecovery;
