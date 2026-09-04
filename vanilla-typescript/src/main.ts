import { initAccount } from "./account";
import { fillAdSlot } from "./ad";
import { initConsent, showConsentPreferences } from "./consent";
import { preferencesButton } from "./elements";
import { specify } from "./specify";
import "./index.css";

preferencesButton.addEventListener("click", () => showConsentPreferences());

specify.onIdentityChange(() => void fillAdSlot());

void initConsent();
void initAccount();
void fillAdSlot();
