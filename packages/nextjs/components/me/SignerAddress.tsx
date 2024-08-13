import { useEffect, useState } from "react";
import { isZeroDevConnector } from "@dynamic-labs/ethereum-aa";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

const SignerAddress = () => {
  const { primaryWallet } = useDynamicContext();
  const [signerAddress, setSignerAddress] = useState("");

  useEffect(() => {
    async function _setSignerAddress(signerConnector: any) {
      if (!signerConnector) {
        return;
      }

      // This is the Dynamic EOA Wallet Client
      const signer: any = await signerConnector.getWalletClient();

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

  if (!signerAddress) return null;

  return <span>My Signer address: {signerAddress}</span>;
};

export default SignerAddress;
