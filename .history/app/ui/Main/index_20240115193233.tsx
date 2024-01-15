"use client";

import ConnectButton from "@/app/lib/ConnectButton";
import { Select, SelectItem } from "@nextui-org/react";
import {
  useAccount,
  useDisconnect,
  useNetwork,
  useSignMessage,
  useSwitchNetwork,
} from "wagmi";
import { getNetwork } from "@wagmi/core";
import { useState } from "react";

export default function Main() {
  const [network, setNetwork] = useState(42161);
  const { chain, chains } = useNetwork();
  const chainId = chain?.id || 42161;
  const { address, status } = useAccount();
  return (
    <div className="flex flex-col p-24">
      <ConnectButton />
      <Select
        items={
          chains.map((item) => ({
            value: item.id,
            label: item.name,
          })) as any
        }
        label="Favorite Animal"
        placeholder="Select an animal"
        className="max-w-xs mt-4"
        onChange={(e) => setNetwork(parseInt(e.target.value, 10))}
      >
        {(item:{
          value: number;
          label: string;
        }) => <SelectItem key={item.value}>{item.label}</SelectItem>}
      </Select>
    </div>
  );
}
