import { useEffect } from "react";
import { useCookieConsent } from "react-cookie-manager";

import { specify } from "./specify";

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
    <button
      type="button"
      onClick={openPreferencesModal}
      className="text-sm underline"
    >
      Consent
    </button>
  );
}
