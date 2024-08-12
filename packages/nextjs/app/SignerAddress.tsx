import { useEffect, useState } from "react";
import { isZeroDevConnector } from "@dynamic-labs/ethereum-aa";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

const SignerAddress = () => {
  const { primaryWallet } = useDynamicContext();
  const [signerAddress, setSignerAddress] = useState("");

  useEffect(() => {
    if (!primaryWallet) {
      return;
    }

    const {
      connector,
      //address, // This is your smart wallet address
    } = primaryWallet;

    if (!isZeroDevConnector(connector)) {
      return;
    }

    const signerConnector = connector.getEOAConnector();
    const ecdsaProvider = connector.getAccountAbstractionProvider();

    console.log("ecdsaProvider");
    console.log(ecdsaProvider);

    if (!signerConnector) {
      return;
    }

    // This is the signer address
    //    const [address2] = signerConnector.getAddress();
    (async () => {
      const signer: any = await signerConnector.getWalletClient();

      console.log(primaryWallet);
      setSignerAddress(signer.account.address);
    })();
  }, [primaryWallet]);

  return <span>My Signer address: {signerAddress}</span>;
};

export default SignerAddress;
