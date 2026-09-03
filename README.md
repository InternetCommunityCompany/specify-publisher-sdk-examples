# Specify Publisher SDK examples

Runnable publisher integrations for [`@specify-sh/publisher-sdk`](https://docs.specify.sh/publishing/get-started).

Each top-level directory is a small, self-contained app with its own `package.json` and README. Pick an example, `cd` into it, and follow its README — there is no shared root install.

## Examples

| Example | Runtime | What it demonstrates |
| --- | --- | --- |
| [`node-typescript`](node-typescript) | Node.js via Bun | Server entry point with an explicit wallet address |

## Documentation

[`https://docs.specify.sh/llms.txt`](https://docs.specify.sh/llms.txt) and the linked publishing guides are the source of truth for these examples:

- [Browser SDK reference](https://docs.specify.sh/publishing/sdk-browser)
- [Node.js SDK reference](https://docs.specify.sh/publishing/sdk-server)

## Adding an example

- Put each integration in a top-level `<stack-name>` directory with its own `package.json`, README, and `.env.example` (no real keys).
- Keep it fully self-contained; do not share code or dependencies between examples.
- Use the browser SDK unless the stack genuinely requires server-side serving.
- Verify behavior against [`llms.txt`](https://docs.specify.sh/llms.txt) and its publishing pages.
