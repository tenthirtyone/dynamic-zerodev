"use client";

import Recovery from "./_components/Recovery";
import type { NextPage } from "next";

const Recover: NextPage = () => {
  return (
    <>
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">Account Recovery</h1>
        <Recovery />
      </div>
    </>
  );
};

export default Recover;
