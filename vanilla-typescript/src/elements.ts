function byId<T extends HTMLElement>(id: string): T {
  return document.querySelector<T>(`#${id}`)!;
}

export const connectButton = byId<HTMLButtonElement>("connect");
export const preferencesButton = byId<HTMLButtonElement>("preferences");
export const accountLabel = byId<HTMLParagraphElement>("account");
export const statusLabel = byId<HTMLParagraphElement>("status");
export const adSlot = byId<HTMLDivElement>("slot");
