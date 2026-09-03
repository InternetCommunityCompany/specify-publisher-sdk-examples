# Node.js + TypeScript example

A minimal publisher integration using the [`@specify-sh/publisher-sdk`](https://docs.specify.sh/publishing/sdk-server) server entry point. Server-side serving requires one or more wallet addresses and cannot use Specify's browser identity cookie or geolocation signals.

Prefer the [browser SDK](https://docs.specify.sh/publishing/sdk-browser) when possible; it provides stronger signals and higher fill rates.

## How to use

Copy the environment template and set a development publisher key and an EVM wallet address:

```sh
cp .env.example .env
```

Install dependencies and run the example:

```sh
bun install
bun start
```

The script requests an ad for the configured wallet and logs the result.
