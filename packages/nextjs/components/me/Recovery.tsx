import { RecoveryProvider } from "@zerodev/sdk";
import useECDSAProvider from "~~/hooks/me/useECDSAProvider";

const Recovery = () => {
  const { ecdsaProvider } = useECDSAProvider();

  async function enableRecovery() {
    if (!ecdsaProvider || !process.env.NEXT_PUBLIC_ZERO_DEV_PROJECT_ID) return null;

    const guardianAddress = "0x0a07988692DDc771B3d9dEA68efcd43a65766f89";

    const recoveryData = {
      guardians: {
        [guardianAddress]: 1,
      },
      threshold: 1,
      delaySeconds: 0,
    };

    const recoveryProvider = await RecoveryProvider.init({
      projectId: process.env.NEXT_PUBLIC_ZERO_DEV_PROJECT_ID,
      defaultProvider: ecdsaProvider,
      opts: {
        validatorConfig: {
          ...recoveryData,
        },
      },
    });

    console.log(recoveryProvider);

    //let result = await recoveryProvider.enableRecovery();
    //await recoveryProvider.waitForUserOperationTransaction(result.hash as any);
    //
    //console.log("Recovery enabled");
  }

  return <button onClick={enableRecovery}>Enable Recovery</button>;
};

export default Recovery;
