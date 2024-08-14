"use client";

import { useState } from "react";
import { RecoveryProvider } from "@zerodev/sdk";
import useECDSAProvider from "~~/hooks/me/useECDSAProvider";

type EthereumAddress = `0x${string}`;

const InitializeRecovery = () => {
  const { ecdsaProvider, smartAccountAddress } = useECDSAProvider();
  const [newOwnerAddress, setNewOwnerAddress] = useState<EthereumAddress>("0x0");
  const [recoveryId, setRecoveryId] = useState("");

  async function initializeRecovery() {
    if (!ecdsaProvider || !process.env.NEXT_PUBLIC_ZERO_DEV_PROJECT_ID) return null;

    try {
      const recoveryProvider = await RecoveryProvider.init({
        projectId: process.env.NEXT_PUBLIC_ZERO_DEV_PROJECT_ID,
        opts: {
          accountConfig: {
            accountAddress: smartAccountAddress as EthereumAddress,
          },
        },
      });
      const _recoveryId = await recoveryProvider.initiateRecovery(newOwnerAddress);
      setRecoveryId(_recoveryId);
    } catch (e: any) {
      console.log(e);
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter new owner address"
        value={newOwnerAddress}
        onChange={e => setNewOwnerAddress(e.target.value as EthereumAddress)}
      />
      <br />
      <button
        onClick={initializeRecovery}
        style={{
          backgroundColor: "#1a82ff",
          color: "white",
          fontSize: "16px",
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
      >
        Initialize Recovery
      </button>
      <br />
      Recovery Id:
      <p>{recoveryId}</p>
    </div>
  );
};

export default InitializeRecovery;
