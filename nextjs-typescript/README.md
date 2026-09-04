# Next.js example

A publisher integration for the Next.js App Router, using the [`useSpecifyAd()`](https://docs.specify.sh/publishing/nextjs) hook from `@specify-sh/publisher-sdk/react`. Scaffolded with `create-next-app` and [shadcn/ui](https://ui.shadcn.com), wallets via [wagmi](https://wagmi.sh), consent via [react-cookie-manager](https://www.npmjs.com/package/react-cookie-manager).

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
| `app/layout.tsx` | Wraps the app in `Providers` |
| `app/page.tsx` | Server Component holding the page; the interactive parts are client |
| `components/providers.tsx` | wagmi, React Query, and consent providers |
| `components/ad-slot.tsx` | The ad slot, via `useSpecifyAd()` |
| `components/consent-bridge.tsx` | Consent bridge and the preferences button |
| `components/wallet-bridge.tsx` | Wallet registration and the connect button |
| `lib/specify.ts` | The `Specify` client singleton |
| `lib/wagmi.ts` | wagmi config |

## What it shows

**Serving from the client** — every component that touches the SDK is a Client Component. Only the browser can hold the Specify cookie, so only a client component can fill a placement for a visitor who has not connected a wallet. Serving from a Server Component means passing wallet addresses explicitly and losing returning-visitor recognition, which is why the docs [recommend against it](https://docs.specify.sh/publishing/nextjs) and this example does not do it.

**The key is public** — `NEXT_PUBLIC_SPECIFY_PUBLISHER_KEY` is inlined into the client bundle by design. Publisher keys are not secrets.

**The hook** (`components/ad-slot.tsx`) — `useSpecifyAd()` serves on mount, subscribes to `onIdentityChange()` itself, and keeps the first ad it gets. The client is created once in `lib/specify.ts` and the same instance is passed on every render; a client rebuilt per render would reset consent and the identified addresses each time.

**Consent** (`components/consent-bridge.tsx`) — `CookieManager` wraps the app in `components/providers.tsx`, showing only its `Advertising` category, since that is what Specify's identity cookie falls under. `ConsentBridge` watches `detailedConsent` and pushes `Advertising.consented` into `setCookieConsent()`. Reacting to the value rather than to accept and decline callbacks is what makes returning visitors work: the library restores the stored decision on mount, so the effect fires with it on every page load. Consent starts `false` on every new client and the SDK never persists it, so that replay is required.

**Wallets** (`components/wallet-bridge.tsx`) — wagmi's `injected()` connector, with `WalletBridge` calling `specify.identify(address)` whenever `useAccount()` reports one. The wagmi config sets `ssr: true` so the prerendered markup matches the client on hydration. Registering a new address fires `onIdentityChange()`, so connecting a wallet retries a still-empty slot on the spot.
