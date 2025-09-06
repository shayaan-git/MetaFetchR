// controllers/analyzeController.js
import { scrapeWebsiteMeta } from "../utils/scraper.js";
import { createWebsite } from "../models/websiteModel.js";
import { isURL } from "../utils/validators.js";
import { enhanceDescription } from "../utils/aiHelper.js";

// POST /api/analyze
export const analyzeWebsite = async (req, res) => {
  const { url } = req.body;

  // Validate URL
  if (!url || !isURL(url)) {
    const err = new Error('Valid "url" is required.');
    err.statusCode = 400;
    throw err;
  }

  // Scrape metadata
  const { brand, description } = await scrapeWebsiteMeta(url);

  //Try ai enhancement
  const enhanced = await enhanceDescription(description);

  // Decide if AI was applied
  const aiEnhanced = enhanced !== description;

  // Save in DB
  const saved = await createWebsite({
    url,
    brand_name: brand,
    description: enhanced,
  });

  // Respond with saved record
  res.status(201).json({ success: true, aiEnhanced, data: saved });
};
