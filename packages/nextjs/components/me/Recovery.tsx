import { useEffect, useState } from "react";
import { isZeroDevConnector } from "@dynamic-labs/ethereum-aa";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

const ECDSAAddress = () => {
  const { primaryWallet } = useDynamicContext();
  const [ecdsaProvider, setECDSAProvider] = useState();
  const [smartAccountAddress, setSmartAccountAddress] = useState("");

  useEffect(() => {
    async function _setSmartAccountAddress(_ecdsaProvider: any) {
      if (!_ecdsaProvider) {
        return;
      }

      // This is the Dynamic EOA Wallet Client
      const address: any = await _ecdsaProvider.getAddress();

      setSmartAccountAddress(address);
    }

    if (!primaryWallet) {
      return;
    }

    const { connector } = primaryWallet;

    if (!isZeroDevConnector(connector)) {
      return;
    }

    const _ecdsaProvider: any = connector.getAccountAbstractionProvider();

    setECDSAProvider(_ecdsaProvider);

    // ZeroDev ecdsaProvider
    console.log("ecdsaProvider");
    console.log(_ecdsaProvider);
    _setSmartAccountAddress(_ecdsaProvider);
  }, [primaryWallet]);

  if (!ecdsaProvider) return null;

  return <span>My Smart Account Address is: {smartAccountAddress} </span>;
};

export default ECDSAAddress;
