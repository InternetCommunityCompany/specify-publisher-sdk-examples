interface Eip1193Provider {
  request(args: { method: string; params?: unknown[] }): Promise<unknown>;
  on(event: "accountsChanged", listener: (accounts: string[]) => void): void;
}

declare global {
  interface Window {
    ethereum?: Eip1193Provider;
  }
}

export function getProvider(): Eip1193Provider | undefined {
  return window.ethereum;
}

export async function getAccounts(): Promise<`0x${string}`[]> {
  const provider = getProvider();

  if (!provider) {
    return [];
  }

  return (await provider.request({ method: "eth_accounts" })) as `0x${string}`[];
}

export async function connect(): Promise<`0x${string}`[]> {
  const provider = getProvider();

  if (!provider) {
    throw new Error("No EVM wallet detected in this browser.");
  }

  return (await provider.request({
    method: "eth_requestAccounts",
  })) as `0x${string}`[];
}

export function onAccountsChanged(
  listener: (accounts: `0x${string}`[]) => void,
): void {
  getProvider()?.on("accountsChanged", (accounts) => {
    listener(accounts as `0x${string}`[]);
  });
}
