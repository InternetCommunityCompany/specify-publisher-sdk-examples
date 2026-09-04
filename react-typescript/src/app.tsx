import { AdSlot } from "./ad-slot";
import { ConsentBridge, ConsentButton } from "./consent";
import { ConnectButton, WalletBridge } from "./wallet";

export function App() {
  return (
    <main className="mx-auto flex max-w-md flex-col gap-6 p-8">
      <ConsentBridge />
      <WalletBridge />

      <h1 className="text-lg font-semibold">Specify browser SDK</h1>

      <div className="flex flex-wrap items-center gap-3">
        <ConnectButton />
        <ConsentButton />
      </div>

      <AdSlot />
    </main>
  );
}
