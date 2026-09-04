import { useEffect } from "react";
import CookieConsent, {
  getCookieConsentValue,
  VISIBILITY_OPTIONS,
} from "react-cookie-consent";

import { specify } from "./specify";

const COOKIE_NAME = "specify-ads-consent";

interface ConsentBannerProps {
  visible: string;
  onResolved: () => void;
}

export function ConsentBanner({ visible, onResolved }: ConsentBannerProps) {
  useEffect(() => {
    specify.setCookieConsent(getCookieConsentValue(COOKIE_NAME) === "true");
  }, []);

  function resolve(granted: boolean): void {
    specify.setCookieConsent(granted);
    onResolved();
  }

  return (
    <CookieConsent
      cookieName={COOKIE_NAME}
      visible={visible}
      enableDeclineButton
      buttonText="Accept"
      declineButtonText="Reject"
      onAccept={() => resolve(true)}
      onDecline={() => resolve(false)}
      disableStyles
      containerClasses="fixed inset-x-0 bottom-0 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-white p-4"
      contentClasses="text-sm"
      buttonWrapperClasses="flex gap-2"
      buttonClasses="rounded bg-slate-900 px-3 py-1 text-sm font-medium text-white"
      declineButtonClasses="rounded border border-slate-300 px-3 py-1 text-sm font-medium"
    >
      We use a cookie to personalise the ads shown on this page.
    </CookieConsent>
  );
}

export { VISIBILITY_OPTIONS };
