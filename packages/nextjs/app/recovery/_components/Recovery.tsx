import { useEffect, useState } from "react";
import { isZeroDevConnector } from "@dynamic-labs/ethereum-aa";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { RecoveryProvider } from "@zerodev/sdk";

const Recovery = () => {
  const { primaryWallet } = useDynamicContext();
  const [signerAddress, setSignerAddress] = useState("");
  const [signer, setSigner] = useState();
  const [recoveryId, setRecoveryId] = useState("");

  useEffect(() => {
    async function _setSignerAddress(signerConnector: any) {
      if (!signerConnector) {
        return;
      }

      // This is the Dynamic EOA Wallet Client
      const signer: any = await signerConnector.getWalletClient();

      setSigner(signer);
      setSignerAddress(signer?.account?.address);
    }

    if (!primaryWallet) {
      return;
    }

    const { connector } = primaryWallet;

    if (!isZeroDevConnector(connector)) {
      return;
    }

    const signerConnector = connector.getEOAConnector();

    _setSignerAddress(signerConnector);
  }, [primaryWallet]);

  async function recover() {
    if (!signer || !process.env.NEXT_PUBLIC_ZERO_DEV_PROJECT_ID) return null;
    const guardianRecoveryProvider = await RecoveryProvider.init({
      projectId: process.env.NEXT_PUBLIC_ZERO_DEV_PROJECT_ID,
      recoveryId,
      opts: {
        validatorConfig: {
          accountSigner: signer,
        },
      },
    });

    await guardianRecoveryProvider.signRecovery();
    console.log("Signed");
    await guardianRecoveryProvider.submitRecovery();
    console.log("Submitted");
  }

  if (!signerAddress) return null;

  return (
    <div>
      <span>My Signer address: {signerAddress}</span>
      <br />
      <input
        type="text"
        placeholder="Enter new owner address"
        value={recoveryId}
        onChange={e => setRecoveryId(e.target.value)}
      />
      <br />
      <button
        onClick={recover}
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
        Sign Recovery ID
      </button>
      <br />
    </div>
  );
};

export default Recovery;
