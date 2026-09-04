import { useState } from "react";

import { AdSlot } from "./ad-slot";
import { ConsentBanner, VISIBILITY_OPTIONS } from "./consent";
import { ConnectButton, WalletBridge } from "./wallet";

export function App() {
  const [bannerVisibility, setBannerVisibility] = useState(
    VISIBILITY_OPTIONS.BY_COOKIE_VALUE,
  );

  return (
    <main className="mx-auto flex max-w-md flex-col gap-6 p-8">
      <WalletBridge />

      <h1 className="text-lg font-semibold">Specify browser SDK</h1>

      <div className="flex flex-wrap items-center gap-3">
        <ConnectButton />
        <button
          type="button"
          onClick={() => setBannerVisibility(VISIBILITY_OPTIONS.SHOW)}
          className="text-sm underline"
        >
          Consent
        </button>
      </div>

      <AdSlot />

      <ConsentBanner
        visible={bannerVisibility}
        onResolved={() =>
          setBannerVisibility(VISIBILITY_OPTIONS.BY_COOKIE_VALUE)
        }
      />
    </main>
  );
}
