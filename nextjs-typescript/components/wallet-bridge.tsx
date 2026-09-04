"use client";

import { useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

import { Button } from "@/components/ui/button";
import { specify } from "@/lib/specify";

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
        <span className="text-muted-foreground font-mono text-xs">
          {address}
        </span>
        <Button variant="ghost" onClick={() => disconnect()}>
          Disconnect
        </Button>
      </div>
    );
  }

  const connector = connectors[0];

  return (
    <div className="flex flex-col gap-1">
      <Button
        disabled={!connector || isPending}
        onClick={() => connector && connect({ connector })}
      >
        {isPending ? "Connecting…" : "Connect wallet"}
      </Button>
      {!connector && (
        <p className="text-muted-foreground text-sm">
          No EVM wallet detected in this browser.
        </p>
      )}
      {error && <p className="text-destructive text-sm">{error.message}</p>}
    </div>
  );
}
