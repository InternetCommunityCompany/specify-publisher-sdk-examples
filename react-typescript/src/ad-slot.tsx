import { ImageFormat } from "@specify-sh/publisher-sdk";
import { useSpecifyAd } from "@specify-sh/publisher-sdk/react";

import { specify } from "./specify";

export function AdSlot() {
  const ad = useSpecifyAd({
    specify,
    imageFormat: ImageFormat.LANDSCAPE,
    adUnitId: "react-example",
  });

  if (!ad) {
    return <p className="text-sm text-slate-500">No ad yet.</p>;
  }

  return (
    <a
      href={ad.ctaUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-2 rounded border border-slate-200 p-4 no-underline"
    >
      {ad.imageUrl && <img src={ad.imageUrl} alt="" className="rounded" />}
      <span className="text-xs text-slate-500">{ad.communityName}</span>
      <h2 className="font-medium">{ad.headline}</h2>
      <p className="text-sm text-slate-600">{ad.content}</p>
      <span className="text-sm font-medium underline">{ad.ctaLabel}</span>
    </a>
  );
}
