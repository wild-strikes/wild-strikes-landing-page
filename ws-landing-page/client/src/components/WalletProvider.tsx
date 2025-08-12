"use client";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import type { PropsWithChildren } from "react";

export default function WalletProvider({ children }: PropsWithChildren) {
  return (
    <AptosWalletAdapterProvider
      autoConnect={true}
      dappConfig={{ network: "testnet" as any }}
      onError={(error: unknown) => {
        console.error("Wallet connection error:", error);
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
}
