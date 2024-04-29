import { getJson } from "serpapi";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const { url } = req.query;

  if (!url) {
    res.status(400).json({ message: "URL parameter is required" });
    return;
  }

  try {
    getJson(
      {
        api_key: process.env.SERP_API_KEY, // Use the API key from the environment variables
        engine: "google_lens",
        url: url,
        no_cache: "true",
      },
      (json) => {
        // Filter to include only matches that have a price object
        const matchesWithPrice = json.visual_matches.filter((match) => match.price !== undefined);
        res.status(200).json(matchesWithPrice);
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve data", error: error.message });
  }
}
