"use client";

import { useEffect } from "react";
import { useCookieConsent } from "react-cookie-manager";

import { Button } from "@/components/ui/button";
import { specify } from "@/lib/specify";

export function ConsentBridge(): null {
  const { detailedConsent } = useCookieConsent();

  useEffect(() => {
    specify.setCookieConsent(detailedConsent?.Advertising?.consented ?? false);
  }, [detailedConsent]);

  return null;
}

export function ConsentButton() {
  const { openPreferencesModal } = useCookieConsent();

  return (
    <Button variant="ghost" onClick={openPreferencesModal}>
      Consent
    </Button>
  );
}
