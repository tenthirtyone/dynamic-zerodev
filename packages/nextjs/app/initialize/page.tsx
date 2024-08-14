"use client";

import type { NextPage } from "next";
import InitializeRecovery from "~~/app/initialize/_components/InitializeRecovery";

const Recovery: NextPage = () => {
  return (
    <>
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">Initialize Account Recovery</h1>
        <InitializeRecovery />
      </div>
    </>
  );
};

export default Recovery;
