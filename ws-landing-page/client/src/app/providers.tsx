"use client";
import WalletProvider from "@/components/WalletProvider";
import type { PropsWithChildren } from "react";

export default function Providers({ children }: PropsWithChildren) {
  return <WalletProvider>{children}</WalletProvider>;
}
