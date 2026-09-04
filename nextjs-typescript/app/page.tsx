import { AdSlot } from "@/components/ad-slot";
import { ConsentBridge, ConsentButton } from "@/components/consent-bridge";
import { ConnectButton, WalletBridge } from "@/components/wallet-bridge";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-col gap-6 p-8">
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
