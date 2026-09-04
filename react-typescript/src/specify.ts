import Specify from "@specify-sh/publisher-sdk";

const publisherKey = import.meta.env.VITE_SPECIFY_PUBLISHER_KEY;

if (!publisherKey) {
  throw new Error("VITE_SPECIFY_PUBLISHER_KEY is not set");
}

export const specify = new Specify({ publisherKey });
