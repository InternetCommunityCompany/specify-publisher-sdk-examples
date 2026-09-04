import {
  ImageFormat,
  ValidationError,
  type SpecifyAd,
} from "@specify-sh/publisher-sdk";

import { adSlot, statusLabel } from "./elements";
import { specify } from "./specify";

let filled = false;

export async function fillAdSlot(): Promise<void> {
  if (filled) {
    return;
  }

  try {
    const ad = await specify.serve({
      imageFormat: ImageFormat.LANDSCAPE,
      adUnitId: "vanilla-example",
    });

    if (!ad) {
      statusLabel.textContent = "No ad yet.";
      return;
    }

    filled = true;
    statusLabel.textContent = "";
    adSlot.append(renderAd(ad));
  } catch (error) {
    if (!(error instanceof ValidationError)) {
      throw error;
    }

    statusLabel.textContent = `Invalid input: ${error.message}`;
  }
}

function renderAd(ad: SpecifyAd): HTMLAnchorElement {
  const card = document.createElement("a");
  card.href = ad.ctaUrl;
  card.target = "_blank";
  card.rel = "noopener noreferrer";
  card.className =
    "flex flex-col gap-2 rounded border border-slate-200 p-4 no-underline";

  if (ad.imageUrl) {
    const image = document.createElement("img");
    image.src = ad.imageUrl;
    image.alt = "";
    image.className = "rounded";
    card.append(image);
  }

  card.append(
    text("p", ad.communityName, "text-xs text-slate-500"),
    text("h2", ad.headline, "font-medium"),
    text("p", ad.content, "text-sm text-slate-600"),
    text("span", ad.ctaLabel, "text-sm font-medium underline"),
  );

  return card;
}

function text(
  tag: keyof HTMLElementTagNameMap,
  value: string,
  className: string,
): HTMLElement {
  const element = document.createElement(tag);
  element.textContent = value;
  element.className = className;
  return element;
}
