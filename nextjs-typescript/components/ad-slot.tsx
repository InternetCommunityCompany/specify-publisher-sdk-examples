"use client";

import { ImageFormat } from "@specify-sh/publisher-sdk";
import { useSpecifyAd } from "@specify-sh/publisher-sdk/react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { specify } from "@/lib/specify";

export function AdSlot() {
  const ad = useSpecifyAd({
    specify,
    imageFormat: ImageFormat.LANDSCAPE,
    adUnitId: "nextjs-example",
  });

  if (!ad) {
    return <p className="text-muted-foreground text-sm">No ad yet.</p>;
  }

  return (
    <a href={ad.ctaUrl} target="_blank" rel="noopener noreferrer">
      <Card>
        {ad.imageUrl && (
          <CardContent>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ad.imageUrl} alt="" className="rounded-lg" />
          </CardContent>
        )}
        <CardHeader>
          <CardDescription>{ad.communityName}</CardDescription>
          <CardTitle>{ad.headline}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">{ad.content}</p>
        </CardContent>
        <CardFooter>
          <span className="text-sm font-medium underline">{ad.ctaLabel}</span>
        </CardFooter>
      </Card>
    </a>
  );
}
