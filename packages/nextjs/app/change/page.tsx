"use client";

import type { NextPage } from "next";
import ChangeOwner from "~~/app/change/_components/ChangeOwner";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Change Smart Wallet Owner</span>
          </h1>
          <div className="flex justify-center items-center space-x-2"></div>
          <p className="text-center text-lg">
            <ChangeOwner />
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
