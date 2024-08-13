import useECDSAProvider from "~~/hooks/me/useECDSAProvider";

const ChangeOwner = () => {
  const { ecdsaProvider } = useECDSAProvider();

  async function changeOwner() {
    if (!ecdsaProvider || !process.env.NEXT_PUBLIC_ZERO_DEV_PROJECT_ID) return null;

    console.log("Changing Owner");
    const retVal = await ecdsaProvider.changeOwner("0x0a07988692DDc771B3d9dEA68efcd43a65766f89");
    console.log("retVal");
    console.log(retVal);
  }

  console.log("ecdsaProvider");
  console.log(ecdsaProvider);

  return <button onClick={changeOwner}>Change Owner</button>;
};

export default ChangeOwner;
