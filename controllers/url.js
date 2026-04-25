const shortid = require("shortid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).render("home", { error: "URL is required.", urls: [] });
    }

    const shortID = shortid();
    await URL.create({
      shortId: shortID,
      redirectURL: url,
      visitHistory: [],
      createdby: req.user._id,
    });

    const allUrls = await URL.find({ createdby: req.user._id });
    return res.render("home", { id: shortID, urls: allUrls, error: null });
  } catch (error) {
    console.error("Short URL generation error:", error);
    return res.status(500).render("home", { error: "Failed to generate short URL.", urls: [] });
  }
}

async function handleUrlClicks(req, res) {
  try {
    const { shortId } = req.params;
    const result = await URL.findOne({ shortId });

    if (!result) {
      return res.status(404).json({ error: "Short URL not found." });
    }

    return res.json({
      shortId,
      redirectURL: result.redirectURL,
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } catch (error) {
    console.error("Analytics error:", error);
    return res.status(500).json({ error: "Failed to fetch analytics." });
  }
}

module.exports = { handleGenerateNewShortURL, handleUrlClicks };
