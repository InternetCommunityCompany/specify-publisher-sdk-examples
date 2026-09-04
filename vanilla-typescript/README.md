# Vanilla JS example

A minimal, framework-free browser publisher integration using the [`@specify-sh/publisher-sdk`](https://docs.specify.sh/publishing/sdk-browser) browser entry point. Built with Vite and TypeScript, styled with Tailwind.

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

Open the printed URL. The ad slot fills itself: it tries on load, and tries again as soon as you answer the consent banner or connect an EVM wallet. Whichever attempt returns an ad keeps the slot.

## Layout

| File | Role |
| --- | --- |
| `src/main.ts` | Entry point; wires the modules below together |
| `src/specify.ts` | The `Specify` client singleton |
| `src/consent.ts` | CMP setup and the consent bridge |
| `src/wallet.ts` | EIP-1193 browser wallet access |
| `src/account.ts` | Connect flow, and registering wallets with the SDK |
| `src/ad.ts` | Requesting an ad and rendering the card |
| `src/elements.ts` | Shared DOM references |

## What it shows

**Client singleton** (`src/specify.ts`) — one `Specify` instance built from `VITE_SPECIFY_PUBLISHER_KEY`. Vite inlines `VITE_`-prefixed variables into the bundle; the publisher key is public by design, so this is expected.

**Consent** (`src/consent.ts`) — [vanilla-cookieconsent](https://cookieconsent.orestbida.com) as the consent management platform, with an `ads` category gating Specify's identity cookie. Its `onConsent` and `onChange` callbacks both push the current value in via `setCookieConsent()`. Both matter: consent starts `false` on every new `Specify` instance and the SDK never persists it, so the CMP is the source of truth and has to replay the stored choice on each page load, not just when the user changes it. Granting consent is also what triggers `onIdentityChange()`, so a slot still empty at that point tries again.

Swap this module for your own CMP. Only the bridge into `setCookieConsent()` is Specify-specific.

**Wallets** (`src/wallet.ts`, `src/account.ts`) — addresses come from the browser wallet over EIP-1193 (`eth_requestAccounts`), not from user input, with no wallet library needed. Connected accounts are registered with `identify()`, so `serve()` is then called with no addresses at all and the SDK attaches them itself. `identify()` merges and never removes, since several wallets can be one person and a disconnect does not retract one. Registering a new address fires `onIdentityChange()`, so connecting a wallet retries a still-empty slot on the spot.

**When the slot fills** (`src/main.ts` → `src/ad.ts`) — `fillAdSlot()` runs once on load and again on every `onIdentityChange()`, and the first ad it gets keeps the slot for good.

This matters because `serve()` returns `null` without making a request when it has neither consent nor a registered address, and that check runs synchronously before the first `await`. Consent and wallet restore both land on later ticks, so a single `serve()` at startup can only ever no-op. `onIdentityChange()` closes that gap: the SDK calls back when `setCookieConsent(true)` grants consent or `identify()` adds a new address, batching several changes in the same tick into one call.

The `filled` flag is set only after an ad actually arrives, never before the request. An empty slot therefore stays eligible for the next attempt, while a filled one is never overwritten.

**Error handling** (`src/ad.ts`) — `ValidationError` is thrown only for malformed input, such as a bad wallet address. A no-fill, API failure, or network failure resolves to `null` instead, which is the `No ad available` path.
