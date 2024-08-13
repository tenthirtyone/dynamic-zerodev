"use client";

import type { NextPage } from "next";
import Recovery from "~~/app/guardians/_components/Recovery";

const Debug: NextPage = () => {
  return (
    <>
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">Set Account Guardians</h1>
        <Recovery />
      </div>
    </>
  );
};

export default Debug;
