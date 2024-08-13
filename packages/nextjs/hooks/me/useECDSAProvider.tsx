import { useEffect, useState } from "react";
import { isZeroDevConnector } from "@dynamic-labs/ethereum-aa";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { ECDSAProvider } from "@zerodev/sdk";

const useECDSAProvider = () => {
  const { primaryWallet } = useDynamicContext();
  const [ecdsaProvider, setECDSAProvider] = useState<ECDSAProvider | null>(null);
  const [smartAccountAddress, setSmartAccountAddress] = useState<string>("");

  useEffect(() => {
    const _setSmartAccountAddress = async (_ecdsaProvider: ECDSAProvider | null) => {
      if (!_ecdsaProvider) {
        return;
      }

      try {
        const address = await _ecdsaProvider.getAddress();
        setSmartAccountAddress(address);
      } catch (error) {
        console.error("Error fetching address from ECDSA provider:", error);
      }
    };

    if (!primaryWallet) {
      return;
    }

    const { connector } = primaryWallet;

    if (!isZeroDevConnector(connector)) {
      return;
    }

    const _ecdsaProvider = connector.getAccountAbstractionProvider() as ECDSAProvider | null;
    setECDSAProvider(_ecdsaProvider);
    _setSmartAccountAddress(_ecdsaProvider);
  }, [primaryWallet]);

  return { ecdsaProvider, smartAccountAddress };
};

export default useECDSAProvider;
