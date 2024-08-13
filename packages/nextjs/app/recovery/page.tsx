"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import InitializeRecovery from "~~/app/recovery/_components/InitializeRecovery";

const Recovery: NextPage = () => {
  const { address } = useAccount();

  console.log(address);
  return (
    <>
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">Recover Account</h1>
        <InitializeRecovery />
      </div>
    </>
  );
};

export default Recovery;
