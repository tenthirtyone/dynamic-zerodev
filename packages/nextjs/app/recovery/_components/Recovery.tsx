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

    // https://github.com/zerodevapp/plugin-examples/blob/main/recovery/recovery.ts
    // https://docs-v4.zerodev.app/use-wallets/recovery

    // This throws "AccountSigner is not set", if you use the RecoveryProvider above, with the
    // guardian signer, DynamicWidget crashes.
    const submitterRecoveryProvider = await RecoveryProvider.init({
      projectId: process.env.NEXT_PUBLIC_ZERO_DEV_PROJECT_ID,
      recoveryId,
    });

    await submitterRecoveryProvider.submitRecovery();
    //await submitterRecoveryProvider.waitForUserOperationTransaction(result.hash as any);
  }

  if (!signerAddress) return null;

  return (
    <div>
      <span>My Signer address: {signerAddress}</span>
      <br />
      <input
        type="text"
        placeholder="Enter recovery id"
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
