import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { CookieManager } from "react-cookie-manager";
import { createRoot } from "react-dom/client";
import { WagmiProvider } from "wagmi";

import { App } from "./app";
import { wagmiConfig } from "./wagmi";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
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
          <App />
        </CookieManager>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>,
);
