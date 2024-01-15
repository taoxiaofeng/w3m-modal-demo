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

  console.log("chains", chains);
  console.log("network", network);

  return (
    <div className="flex flex-col p-24">
      <ConnectButton />
      <Select
        label="Select an animal"
        className="max-w-xs mt-4"
        onChange={(e) => setNetwork(parseInt(e.target.value, 10))}
      >
        {chains.map((item) => (
          <SelectItem key={item.id} value={item.name}>
            {item.name}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
