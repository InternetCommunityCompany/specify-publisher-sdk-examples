# React example

A publisher integration for React, using the [`useSpecifyAd()`](https://docs.specify.sh/publishing/react) hook from `@specify-sh/publisher-sdk/react`. Built with Vite and TypeScript, wallets via [wagmi](https://wagmi.sh), consent via [react-cookie-consent](https://www.npmjs.com/package/react-cookie-consent), styled with Tailwind.

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
| `src/main.tsx` | Mounts the app inside the wagmi and React Query providers |
| `src/app.tsx` | Page layout and banner visibility state |
| `src/specify.ts` | The `Specify` client singleton |
| `src/consent.tsx` | The consent banner and the bridge into the SDK |
| `src/wagmi.ts` | wagmi config |
| `src/wallet.tsx` | `WalletBridge` and the connect button |
| `src/ad-slot.tsx` | The ad slot, via `useSpecifyAd()` |

## What it shows

**The hook** (`src/ad-slot.tsx`) — `useSpecifyAd()` returns the ad or `null`, and does the retry work itself: it serves on mount, subscribes to `onIdentityChange()`, and keeps the first ad it gets rather than swapping it later. Because the client is passed in, the slot needs no addresses at the call site; it serves on whatever `identify()` and consent have made available.

Create the `Specify` client once and pass the same instance on every render (`src/specify.ts`). A client rebuilt per render would reset consent and the identified addresses each time.

**Consent** (`src/consent.tsx`) — [react-cookie-consent](https://www.npmjs.com/package/react-cookie-consent) for the banner, bridged into the SDK with `setCookieConsent()`. Granting consent fires `onIdentityChange()`, which is what lets a still-empty slot try again.

The mount effect is the load-bearing part. This library shows its banner only when the cookie is missing, and `onAccept` fires solely on click — a returning visitor triggers no callback at all. Wiring only `onAccept`/`onDecline` would therefore leave consent `false` on every repeat visit, so the banner reads the stored answer with `getCookieConsentValue()` on mount and pushes it in before the slot serves. Consent starts `false` on every new client and the SDK never persists it, which is why the stored answer has to be replayed each load.

The banner is rendered with `disableStyles` and Tailwind classes rather than the library's inline styles. Because `visible="show"` bypasses the component's own hide-on-accept behaviour, `App` owns that state and resets it to `byCookieValue` once a choice is made.

**Wallets** (`src/wagmi.ts`, `src/wallet.tsx`) — wagmi's `injected()` connector, with `WalletBridge` calling `specify.identify(address)` whenever `useAccount()` reports one. Registering a new address fires `onIdentityChange()`, so connecting a wallet retries a still-empty slot on the spot. `identify()` merges and never removes, since several wallets can be one person and a disconnect does not retract one.

`WalletBridge` renders `null`. It exists to wire wagmi's state into the SDK, not to draw anything.
