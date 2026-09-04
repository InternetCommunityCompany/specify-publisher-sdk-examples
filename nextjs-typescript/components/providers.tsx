"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { CookieManager } from "react-cookie-manager";
import { WagmiProvider } from "wagmi";

import { wagmiConfig } from "@/lib/wagmi";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <CookieManager
          cookieKey="specify-ads-consent"
          showManageButton
          cookieCategories={{
            Analytics: false,
            Social: false,
            Advertising: true,
          }}
          translations={{
            title: "Cookies",
            message:
              "We use a cookie to personalise the ads shown on this page.",
          }}
        >
          {children}
        </CookieManager>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
