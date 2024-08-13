"use client";

import type { NextPage } from "next";
import ECDSAAddress from "~~/components/me/ECDSAAddress";
import SignerAddress from "~~/components/me/SignerAddress";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
          </h1>
          <div className="flex justify-center items-center space-x-2"></div>
          <p className="text-center text-lg">
            Get started by editing{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/nextjs/app/page.tsx
            </code>
          </p>
        </div>

        <SignerAddress />

        <ECDSAAddress />
      </div>
    </>
  );
};

export default Home;
