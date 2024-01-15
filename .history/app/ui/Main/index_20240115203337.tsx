"use client";

import ConnectButton from "@/app/lib/ConnectButton";
import { Input, Select, SelectItem } from "@nextui-org/react";
import {
  useAccount,
  useBalance,
  useContractWrite,
  useDisconnect,
  useNetwork,
  usePrepareContractWrite,
  useSignMessage,
  useSwitchNetwork,
  useWaitForTransaction,
} from "wagmi";
import { getNetwork } from "@wagmi/core";
import { useState } from "react";
import contract from "./contract";
import { useDebounce } from "use-debounce";
import { parseUnits } from "viem";

export default function Main() {
  const [network, setNetwork] = useState(42161);
  const [amount, setAmount] = useState(0);
  const { chain, chains } = useNetwork();
  const { address, status } = useAccount();
  const [debouncedTo] = useDebounce(network, 500);
  const [debouncedAmount] = useDebounce<
    number | string | bigint | 0 | undefined
  >(amount, 500);

  console.log("chains", chains);
  console.log("network", network);

  const { data: balance } = useBalance({
    address,
    chainId: network,
    token: contract.get(network + "")?.address as `0x${string}`,
    onError: (error) => {
      console.log(`useBalance -- error -- `, error);
    },
  });

  // usePrepareContractWrite
  const { config } = usePrepareContractWrite({
    address: contract.get(network + "")?.address as `0x${string}`,
    abi: contract.get(network + "")?.abi,
    functionName: "transfer",
    chainId: network,
    args: [
      "0x0000000",
      parseUnits(debouncedAmount?.toString(), 6),
    ], 
    onError: (error) => {
      let msg = "transfer error";
      if (
        error?.message?.indexOf("ERC20:") > -1 &&
        error?.message?.indexOf("Contract Call:") > -1
      ) {
        const start = error?.message?.indexOf("ERC20:");
        const end = error?.message?.indexOf("Contract Call:");
        msg = error?.message.substring(start, end).trim();
      } else {
        msg = error?.message;
      }
      console.log(`usePrepareContractWrite -- error -- `, error);
    },
  });

  // Add the usePrepareSendTransaction hook,This hook eagerly fetches the parameters required for sending a transaction such as the gas estimate.
  // const { data, error, sendTransaction } = useSendTransaction(config);
  const {
    data,
    isLoading: contractWriteIsLoading,
    write: sendUSDT,
  } = useContractWrite({
    ...config,
    onError: (error) => {
      console.log(`useContractWrite -- error -- `, error);
    },
  });

  // Add the useSendTransaction hook, This hook performs the actual transaction.
  const {
    isLoading,
    isSuccess,
    data: transactionData,
  } = useWaitForTransaction({
    hash: data?.hash,
    onError: (error) => {
      console.log(`useWaitForTransaction -- error -- `, error);
    },
    onSuccess(response) {
      console.log(`response -- `, response);
    },
  });

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
      <Input
        label="amount"
        className="max-w-xs mt-4"
        onChange={(e) => setAmount(parseInt(e.target.value, 10))}
      />
    </div>
  );
}
