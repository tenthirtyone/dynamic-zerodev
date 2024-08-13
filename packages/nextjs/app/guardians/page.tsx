"use client";

import type { NextPage } from "next";
import EnableRecovery from "~~/app/guardians/_components/EnableRecovery";

const Debug: NextPage = () => {
  return (
    <>
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">Set Account Guardian</h1>
        <EnableRecovery />
      </div>
    </>
  );
};

export default Debug;
