"use client";

import { useState } from "react";
import useECDSAProvider from "~~/hooks/me/useECDSAProvider";

type EthereumAddress = `0x${string}`;

const ChangeOwner = () => {
  const { ecdsaProvider } = useECDSAProvider();
  const [newOwner, setNewOwner] = useState<EthereumAddress>("0x0");
  const [txHash, setTxHash] = useState("");

  async function changeOwner() {
    if (!ecdsaProvider || !process.env.NEXT_PUBLIC_ZERO_DEV_PROJECT_ID) return null;

    const { hash, request } = await ecdsaProvider.changeOwner(newOwner);

    // The tx hash is always wrong, but the tx does send and is mined. ::boggle::
    console.log(request);
    setTxHash(hash);
  }

  return (
    <>
      <input
        type="text"
        placeholder="Enter new owner address"
        value={newOwner}
        onChange={e => setNewOwner(e.target.value as EthereumAddress)}
      />
      <br />
      <button
        onClick={changeOwner}
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
        Change Owner
      </button>

      {txHash && (
        <div>
          This tx Hash is a lie:
          <p>{txHash}</p>
          But it means your transaction has been sent.
        </div>
      )}
    </>
  );
};

export default ChangeOwner;
