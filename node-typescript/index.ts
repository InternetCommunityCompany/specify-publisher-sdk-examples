import {
  ImageFormat,
  serve,
  ValidationError,
} from "@specify-sh/publisher-sdk/server";

const publisherKey = process.env.SPECIFY_PUBLISHER_KEY;
const walletAddress = process.env.WALLET_ADDRESS;

if (!publisherKey) {
  throw new Error("SPECIFY_PUBLISHER_KEY is not set");
}

if (!walletAddress) {
  throw new Error("WALLET_ADDRESS is not set");
}

try {
  const ad = await serve({
    publisherKey,
    walletAddresses: [walletAddress as `0x${string}`],
    imageFormat: ImageFormat.LANDSCAPE,
    adUnitId: "node-example",
  });

  if (ad) {
    console.log("Retrieved ad:", ad);
  } else {
    console.log("No ad available for this wallet");
  }
} catch (error) {
  if (error instanceof ValidationError) {
    console.error("Invalid publisher configuration:", error.message);
    process.exitCode = 1;
  } else {
    throw error;
  }
}
