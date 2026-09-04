import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";

import { specify } from "./specify";

const ADS_CATEGORY = "ads";

function applyConsent(): void {
  specify.setCookieConsent(CookieConsent.acceptedCategory(ADS_CATEGORY));
}

export function initConsent(): Promise<void> {
  return CookieConsent.run({
    categories: {
      necessary: { enabled: true, readOnly: true },
      [ADS_CATEGORY]: {},
    },
    language: {
      default: "en",
      translations: {
        en: {
          consentModal: {
            title: "Cookies",
            description:
              "We use a cookie to personalise the ads shown on this page.",
            acceptAllBtn: "Accept",
            acceptNecessaryBtn: "Reject",
            showPreferencesBtn: "Manage",
          },
          preferencesModal: {
            title: "Preferences",
            acceptAllBtn: "Accept all",
            acceptNecessaryBtn: "Reject all",
            savePreferencesBtn: "Save",
            closeIconLabel: "Close",
            sections: [
              {
                title: "Strictly necessary",
                description: "Required for the site to work.",
                linkedCategory: "necessary",
              },
              {
                title: "Advertising",
                description:
                  "Lets Specify set an identity cookie so ads can be more personalized.",
                linkedCategory: ADS_CATEGORY,
              },
            ],
          },
        },
      },
    },
    onConsent: applyConsent,
    onChange: applyConsent,
  });
}

export const showConsentPreferences = CookieConsent.showPreferences;
