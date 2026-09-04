# React example

A publisher integration for React, using the [`useSpecifyAd()`](https://docs.specify.sh/publishing/react) hook from `@specify-sh/publisher-sdk/react`. Built with Vite and TypeScript, wallets via [wagmi](https://wagmi.sh), consent via [react-cookie-manager](https://www.npmjs.com/package/react-cookie-manager), styled with Tailwind.

For a framework-free version of the same integration, see [`vanilla-typescript`](../vanilla-typescript).

## How to use

Copy the environment template and set a development publisher key:

```sh
cp .env.example .env.local
```

Install dependencies and start the dev server:

```sh
bun install
bun dev
```

Open the printed URL. The ad slot fills itself: it serves on mount, and tries again as soon as you answer the consent banner or connect a wallet.

## Layout

| File | Role |
| --- | --- |
| `src/main.tsx` | Mounts the app inside the wagmi, React Query, and consent providers |
| `src/app.tsx` | Page layout |
| `src/specify.ts` | The `Specify` client singleton |
| `src/consent.tsx` | The consent bridge and the preferences button |
| `src/wagmi.ts` | wagmi config |
| `src/wallet.tsx` | `WalletBridge` and the connect button |
| `src/ad-slot.tsx` | The ad slot, via `useSpecifyAd()` |

## What it shows

**The hook** (`src/ad-slot.tsx`) — `useSpecifyAd()` returns the ad or `null`, and does the retry work itself: it serves on mount, subscribes to `onIdentityChange()`, and keeps the first ad it gets rather than swapping it later. Because the client is passed in, the slot needs no addresses at the call site; it serves on whatever `identify()` and consent have made available.

Create the `Specify` client once and pass the same instance on every render (`src/specify.ts`). A client rebuilt per render would reset consent and the identified addresses each time.

**Consent** (`src/consent.tsx`) — [react-cookie-manager](https://www.npmjs.com/package/react-cookie-manager) provides the banner and preferences modal. `CookieManager` wraps the app in `src/main.tsx`, and only its `Advertising` category is shown, since that is the one Specify's identity cookie falls under.

`ConsentBridge` watches `detailedConsent` from `useCookieConsent()` and pushes `Advertising.consented` into `setCookieConsent()`. Reacting to the value rather than to accept and decline callbacks is what makes returning visitors work: the library restores the stored decision on mount, so the effect fires with it on every page load, not only when the user changes their mind. Consent starts `false` on every new client and the SDK never persists it, so that replay is required. Granting consent fires `onIdentityChange()`, which is what lets a still-empty slot try again.

The library injects its own styles at runtime. Do not import `react-cookie-manager/style.css`: version 5.4.1 declares that subpath in its `exports` but ships no CSS file, so the import fails the build.

**Wallets** (`src/wagmi.ts`, `src/wallet.tsx`) — wagmi's `injected()` connector, with `WalletBridge` calling `specify.identify(address)` whenever `useAccount()` reports one. Registering a new address fires `onIdentityChange()`, so connecting a wallet retries a still-empty slot on the spot. `identify()` merges and never removes, since several wallets can be one person and a disconnect does not retract one.

`WalletBridge` renders `null`. It exists to wire wagmi's state into the SDK, not to draw anything.
