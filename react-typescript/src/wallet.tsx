import { useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

import { specify } from "./specify";

export function WalletBridge(): null {
  const { address } = useAccount();

  useEffect(() => {
    if (address) {
      specify.identify(address);
    }
  }, [address]);

  return null;
}

export function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending, error } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs text-slate-500">{address}</span>
        <button
          type="button"
          onClick={() => disconnect()}
          className="text-sm underline"
        >
          Disconnect
        </button>
      </div>
    );
  }

  const connector = connectors[0];

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        disabled={!connector || isPending}
        onClick={() => connector && connect({ connector })}
        className="rounded bg-slate-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {isPending ? "Connecting…" : "Connect wallet"}
      </button>
      {!connector && (
        <p className="text-sm text-slate-500">
          No EVM wallet detected in this browser.
        </p>
      )}
      {error && <p className="text-sm text-red-600">{error.message}</p>}
    </div>
  );
}
