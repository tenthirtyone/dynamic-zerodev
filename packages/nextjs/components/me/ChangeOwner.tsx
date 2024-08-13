import useECDSAProvider from "~~/hooks/me/useECDSAProvider";

const ChangeOwner = () => {
  const { ecdsaProvider } = useECDSAProvider();

  async function changeOwner() {
    if (!ecdsaProvider || !process.env.NEXT_PUBLIC_ZERO_DEV_PROJECT_ID) return null;

    console.log("Changing Owner");
    const retVal = await ecdsaProvider.changeOwner("0x9B2D984FF9946eC5255e5cf56A8cF24f413F3B0F");
    console.log("retVal");
    console.log(retVal);
  }

  console.log("ecdsaProvider");
  console.log(ecdsaProvider);

  return <button onClick={changeOwner}>Change Owner</button>;
};

export default ChangeOwner;
