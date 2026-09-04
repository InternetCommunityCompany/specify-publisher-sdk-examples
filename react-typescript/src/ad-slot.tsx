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
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <span className="rounded bg-slate-100 px-1.5 py-0.5 font-medium tracking-wide text-slate-600 uppercase">
          Sponsored
        </span>
        <span>{ad.communityName}</span>
      </div>
      <h2 className="font-medium">{ad.headline}</h2>
      <p className="text-sm text-slate-600">{ad.content}</p>
      <span className="text-sm font-medium underline">{ad.ctaLabel}</span>
    </a>
  );
}
