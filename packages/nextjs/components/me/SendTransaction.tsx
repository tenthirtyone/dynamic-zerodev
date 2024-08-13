"use client";

import { parseEther } from "viem";
import { useSendTransaction } from "wagmi";

const SendTransaction: React.FC = () => {
  const { sendTransaction } = useSendTransaction();

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const to = "0x0c4Cb3C12F771dEB4C60C841c18CDea6057CE8c0";
    const value = parseEther(".001");

    sendTransaction({ to, value });
  }

  return (
    <form onSubmit={submit}>
      <button
        type="submit"
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Send Transaction
      </button>
    </form>
  );
};

export default SendTransaction;
