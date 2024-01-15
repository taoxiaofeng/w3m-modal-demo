import { useWeb3Modal } from '@web3modal/wagmi/react';
import { Button } from '@nextui-org/react';
import { getNetwork } from '@wagmi/core';
import {
  useAccount,
  useDisconnect,
  useSignMessage,
  useSwitchNetwork,
} from 'wagmi';

export default function ConnectButton() {
  // 4. Use modal hook
  const { open } = useWeb3Modal();

  const { chain } = getNetwork();

  const { address, status } = useAccount();

  const { disconnect } = useDisconnect();

  return (
    <div className="flex flex-col">
      <div className="mt-4">{chain?.name}</div>
      <div className="mt-4">{address}</div>
      <Button color="primary" className="mt-4" onClick={() => open()}>
        Open Connect Modal
      </Button>
      <Button
        color="primary"
        className="mt-4"
        onClick={() => open({ view: 'Networks' })}
      >
        Open Network Modal
      </Button>

      <Button color="primary" className="mt-4" onClick={() => disconnect()}>
        disconnect
      </Button>
    </div>
  );
}
