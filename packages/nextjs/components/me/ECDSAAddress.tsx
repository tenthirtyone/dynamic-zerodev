import useECDSAProvider from "~~/hooks/me/useECDSAProvider";

const ECDSAAddress = () => {
  const { smartAccountAddress } = useECDSAProvider();

  if (!smartAccountAddress) return null;

  return <span>My Smart Account Address is: {smartAccountAddress} </span>;
};

export default ECDSAAddress;
