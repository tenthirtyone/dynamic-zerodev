"use client";

import Recovery from "./Recovery";
import SignerAddress from "./SignerAddress";
import type { NextPage } from "next";
import { parseEther } from "viem";
import { useAccount, useSendTransaction } from "wagmi";

const Home: NextPage = () => {
  const { sendTransaction } = useSendTransaction();
  const { address } = useAccount();

  console.log(address);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    sendTransaction({ to: "0x0c4Cb3C12F771dEB4C60C841c18CDea6057CE8c0", value: parseEther(".001") });
  }

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

        <form onSubmit={submit}>
          <button type="submit">Submit</button>
        </form>

        <SignerAddress />

        <Recovery />
      </div>
    </>
  );
};

export default Home;
