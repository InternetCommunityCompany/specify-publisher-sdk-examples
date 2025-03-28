import Specify, { ValidationError } from "@specify-sh/sdk";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

if (!process.env.SPECIFY_PUBLISHER_KEY) {
  throw new Error("SPECIFY_PUBLISHER_KEY is not set");
}

// Initialize the library with your publisher key
const specify = new Specify({
  publisherKey: process.env.SPECIFY_PUBLISHER_KEY,
});

async function main() {
  try {
    const walletAddress = "0x0000000000000000000000000000000000000000";

    // Fetch ad content for the specified wallet address
    const content = await specify.serve(walletAddress);

    if (content) {
      console.log("Retrieved ad content:", content);
    } else {
      console.log("No ad content found for user");
    }
  } catch (error) {
    console.log(error);
    if (error instanceof ValidationError) {
      console.error("Validation Error:", error.message);
    } else {
      console.error("Unknown error occurred");
    }
  }
}

// Run the example
main();
