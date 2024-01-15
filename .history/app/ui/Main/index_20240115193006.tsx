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
  const { chain, chains} = useNetwork();
  const chainId = chain?.id || 42161;
  const { address, status } = useAccount();
  return (
    <div className="flex flex-col p-24">
      <ConnectButton />
      <Select
        items={chains}
        label="Favorite Animal"
        placeholder="Select an animal"
        className="max-w-xs"
        onChange={(e) => setNetwork(parseInt(e.target.value, 10))}
      >
        {(item) => <SelectItem key={item.id}>{item.name}</SelectItem>}
      </Select>
    </div>
  );
}
