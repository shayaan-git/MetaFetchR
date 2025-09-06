import axios from "axios";
import * as cheerio from "cheerio";

// Extract brand + description from a webpage
export const scrapeWebsiteMeta = async (url) => {
  try {
    // Fetch the page HTML
    const { data: html } = await axios.get(url, {
      timeout: 10000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });

    // Load HTML into Cheerio parser
    const $ = cheerio.load(html);

    // Try Extracting brand name
    const brand =
      $('meta[property="og:site_name"]').attr("content") ||
      $("title").text() ||
      null;

    // Try Extracting description
    const description =
      $('meta[name="description"]').attr("content") ||
      $('meta[property="og:description"]').attr("content") ||
      $("p").first().text().slice(0, 160) ||
      "no description available";

    return { brand, description };
  } catch (err) {
    console.error("Scrapper error:", err.message);
    throw new Error("Failed to scrape website metadata");
  }
};
