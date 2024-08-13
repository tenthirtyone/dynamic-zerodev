import React from "react";
import { useKernelAccountRecovery } from "@zerodev/recovery";

function AccountRecovery() {
  const kernelAddress = "0x96A46b3f45F78e4054E2B37f2e49ED0d13A8226a";
  const suggestedGuardianAddress = "0x0a07988692DDc771B3d9dEA68efcd43a65766f89";
  const chainId = 11155111;

  const { openRecoveryPopup, error, recoveryEnabled, guardians, isPending } = useKernelAccountRecovery({
    address: kernelAddress,
    chainId,
    suggestedGuardianAddress, // optional
    onSetupGuardianRequest: async userOpCallData => {
      // Implement the logic to send the UserOp
      // For example, if you are using the ZeroDev SDK, you could do:
      //
      // await ecdsaProvider.sendUserOperation(userOpCallData)
      console.log(userOpCallData);
    },
  });

  return (
    <div>
      <button onClick={openRecoveryPopup}>Manage Recovery Guardians</button>
      {error && <p>Error: {error}</p>}
      {isPending && <p>Guardian update in progress...</p>}
      {recoveryEnabled && (
        <div>
          <h3>Guardians</h3>
          {guardians.map((guardian, index) => (
            <p key={index}>{guardian}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default AccountRecovery;
