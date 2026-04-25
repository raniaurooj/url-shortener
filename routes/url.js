const express = require("express");
const { restrictTO } = require("../middleware/auth");
const { handleGenerateNewShortURL, handleUrlClicks } = require("../controllers/url");
const URL = require("../models/url");

const router = express.Router();

// Generate a new short URL (authenticated users only)
router.post("/", restrictTO(["NORMAL", "ADMIN"]), handleGenerateNewShortURL);

// Redirect short URL to original
router.get("/:shortId", async (req, res) => {
  try {
    const { shortId } = req.params;

    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } },
      { new: true }
    );

    if (!entry) {
      return res.status(404).send("Short URL not found.");
    }

    return res.redirect(entry.redirectURL);
  } catch (error) {
    console.error("Redirect error:", error);
    return res.status(500).send("Something went wrong.");
  }
});

// Analytics for a short URL
router.get("/analytics/:shortId", restrictTO(["NORMAL", "ADMIN"]), handleUrlClicks);

module.exports = router;
