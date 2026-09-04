import Specify from "@specify-sh/publisher-sdk";

const publisherKey = process.env.NEXT_PUBLIC_SPECIFY_PUBLISHER_KEY;

if (!publisherKey) {
  throw new Error("NEXT_PUBLIC_SPECIFY_PUBLISHER_KEY is not set");
}

export const specify = new Specify({ publisherKey });
